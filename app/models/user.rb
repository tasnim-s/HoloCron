class User < ApplicationRecord

    attr_reader :password

    validates :email, :first_name, :last_name, :birthday, :gender, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true

    after_initialize :ensure_session_token

    has_one_attached :profile_pic

    has_one_attached :cover_photo

    has_many :posts, foreign_key: :wall_id, class_name: :Post, dependent: :destroy

    has_many :comments, foreign_key: :commenter_id, class_name: :Comment, dependent: :destroy
    
    has_many :likes, foreign_key: :liker_id, class_name: :Like, dependent: :destroy

    has_many :friendships, dependent: :destroy

    has_many :friends, through: :friendships

    has_many :received_requests, foreign_key: :requestee_id, class_name: :Request
    
    has_many :sent_requests, foreign_key: :requester_id, class_name: :Request


    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_unique_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_unique_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
            self.session_token = new_session_token
        end
        self.session_token
    end
end

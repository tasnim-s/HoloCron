class Post < ApplicationRecord

    validates :content, presence: true

    belongs_to :creator, foreign_key: :creator_id, class_name: :User

    belongs_to :wall, foreign_key: :wall_id, class_name: :User

    has_many :likes, as: :likeable, dependent: :destroy

    has_many :comments, foreign_key: :post_id, class_name: :Comment, dependent: :destroy

    has_one_attached :image
end

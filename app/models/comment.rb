class Comment < ApplicationRecord
    has_many :likes, as: :likeable, dependent: :destroy

    validates :content, presence: true

    belongs_to :commenter, foreign_key: :commenter_id, class_name: :User

    belongs_to :post, foreign_key: :post_id, class_name: :Post
end

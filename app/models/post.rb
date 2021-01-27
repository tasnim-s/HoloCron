class Post < ApplicationRecord

    validates :content, presence: true

    belongs_to :creator, foreign_key: :creator_id, class_name: :User
end

class Friendship < ApplicationRecord
    belongs_to :user

    belongs_to :friend, class_name: :User

    def self.create_link(user_id, friend_id)
        user_link = Friendship.create(user_id: user_id, friend_id: friend_id)
        friend_link = Friendship.create(user_id: friend_id, friend_id: user_id)

        [user_link, friend_link]
    end

    def self.destroy_link(user_id, friend_id)
        link1 = Friendship.find_by(user_id: user_id, friend_id: friend_id)
        link2 = Friendship.find_by(user_id: friend_id, friend_id: user_id)

        link1.destroy
        link2.destroy
    end
end

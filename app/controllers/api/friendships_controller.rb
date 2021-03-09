class Api::FriendshipsController < ApplicationController
    def create
        friendship = Friendship.create_link(friendship_params[:user_id], friendship_params[:friend_id])
        all_users
        render "api/users/index"
    end

    def destroy
        Friendship.destroy_link(friendship_params[:user_id], friendship_params[:friend_id])
        all_users
        render "api/users/index"
    end

    private
    def friendship_params
        params.require(:friendship).transform_keys(&:underscore).permit(:user_id, :friend_id)
    end

    def all_users
        @users = User.all.includes(:posts, :friends, :likes)
    end
end

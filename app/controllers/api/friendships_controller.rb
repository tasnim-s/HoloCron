class Api::FriendshipsController < ApplicationController
    def create
        friendship = Friendship.create_link(friendship_params[:user_id], friendship_params[:friend_id])
        render json: {}
    end

    def destroy
        Friendship.destroy_link(friendship_params[:user_id], friendship_params[:friend_id])
        render json: {}
    end

    private
    def friendship_params
        params.require(:friendship).transform_keys(&:underscore).permit(:user_id, :friend_id)
    end
end

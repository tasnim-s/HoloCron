class Api::FriendshipsController < ApplicationController
    def create
        Friendship.create_link(params[:user_id], params[:friend_id])
    end

    def destroy
        Friendship.destroy_link(param[:user_id], params[:friend_id])
    end
end

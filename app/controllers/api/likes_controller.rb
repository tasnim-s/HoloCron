class Api::LikesController < ApplicationController

    def create
        @like = Like.new(like_params)
        if @like.save
            render json: {}
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find_by(like_params)
        @like.destroy
        render json: {}
    end

    private
    def like_params
        params.require(:like).permit(:likeable_type, :likeable_id, :liker_id)
    end
end

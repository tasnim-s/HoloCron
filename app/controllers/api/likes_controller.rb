class Api::LikesController < ApplicationController

    def create
        @like = Like.new(like_params)
        if @like.save
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy
    end

    private
    def like_params
        params.require(:like).permit(:likeable_type, :likeable_id, :liker_id)
    end
end

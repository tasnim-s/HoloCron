class Api::LikesController < ApplicationController

    def create
    end

    private
    def like_params
        params.require(:like).permit(:likeable_type, :likeable_id, :liker_id)
    end
end

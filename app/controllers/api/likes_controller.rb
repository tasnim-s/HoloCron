class Api::LikesController < ApplicationController

    def create
        @like = Like.new(like_params)
        if @like.save
            find_user
            render "api/users/show"
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find_by(like_params)
        @like.destroy
        find_user
        render "api/users/show"
    end

    private
    def like_params
        params.require(:like).transform_keys(&:underscore).permit(:likeable_type, :likeable_id, :liker_id)
    end

    def find_post(like)
        if(like.likeable_type == "Post")
            return Post.find_by(id: like.likeable_id)
        else
            comment = Comment.find_by(id: like.likeable_id)
            return Post.find_by(id: comment.post_id)
        end
    end

    def find_user
        post = find_post(@like)
        @user = User.includes(:posts, :comments, :friends).find_by(id: post.creator_id)
    end
end

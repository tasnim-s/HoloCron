class Api::CommentsController < ApplicationController

    def index
        @comments = Comment.all
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            find_user
            render "api/users/show"
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment && @comment.update(comment_params)
            find_user
            render "api/users/show"
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def show
        @comment = Comment.find_by(id: params[:id])
        render :show
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment
            @comment.destroy
            find_user
            render "api/users/show"
        else
            render ['comment does not exist']
        end
    end

    private
    def comment_params 
        params.require(:comment).transform_keys(&:underscore).permit(:content, :commenter_id, :post_id, :parent_id)
    end

    def find_user
        post = Post.find_by(id: @comment.post_id)
        @user = User.includes(:posts, :friends).find_by(id: post.wall_id)
    end
end

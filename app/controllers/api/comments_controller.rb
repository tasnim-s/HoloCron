class Api::CommentsController < ApplicationController

    def index
        @comments = Comment.all
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = comment.find_by(id: params[:id])
        if @comment && @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def show
        @comment = comment.find_by(id: params[:id])
        render :show
    end

    def destroy
        @comment = comment.find_by(id: params[:id])
        if @comment
            @comment.destroy
            @comments = Comment.all
            render :index
        else
            render ['comment does not exist']
        end
    end

    private
    def comment_params 
        params.require(:comment).transform_keys(&:underscore).permit(:content, :commenter_id, :post_id)
    end
end

class Api::PostsController < ApplicationController
    def create
        @post = Post.new(post_params)
        @post.creator_id = current_user.id
        if @post.save
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def update
        @post = Post.find_by(id: params[:id])
        if @post && @post.update(post_params)
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def show
        @post = Post.find_by(id: params[:id])
        render :show
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        if @post
            @post.destroy
            render :show
        else
            render ['Post does not exist']
        end
    end

    private
    def post_params 
        params.require(:post).permit(:content)
    end
end

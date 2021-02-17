class Api::PostsController < ApplicationController

    def index
        @posts = Post.all
        render :index
    end
    
    def show
        @post = Post.includes(:comments).find_by(id: params[:id])
        render :show
    end
    
    def create
        @post = Post.new(post_params)
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


    def destroy
        @post = Post.find_by(id: params[:id])
        if @post
            @post.destroy
            render :index
        else
            render ['Post does not exist']
        end
    end

    private
    def post_params 
        params.require(:post).transform_keys(&:underscore).permit(:content, :creator_id, :image)
    end
end

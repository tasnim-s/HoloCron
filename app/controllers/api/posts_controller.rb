class Api::PostsController < ApplicationController

    def index
        @posts = Post.all.includes(:comments, :likes, :creator)
        render :index
    end
    
    def show
        @post = Post.includes(:comments, :likes, :creator).find_by(id: params[:id])
        render :show
    end
    
    def create
        @post = Post.new(post_params)
        if @post.save
            find_user
            render "api/users/show"
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def update
        @post = Post.find_by(id: params[:id])
        if @post && @post.update(post_params)
            find_user
            render "api/users/show"
        else
            render json: @post.errors.full_messages, status: 422
        end
    end


    def destroy
        @post = Post.find_by(id: params[:id])
        if @post
            @post.destroy
            find_user
            render "api/users/show"
        else
            render ['Post does not exist']
        end
    end

    private
    def post_params 
        params.require(:post).transform_keys(&:underscore).permit(:content, :creator_id, :image, :creator, :wall_id)
    end

    def find_user
        @user = User.includes(:posts, :friends).find_by(id: @post.wall_id)
    end
end

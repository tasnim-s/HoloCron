class Api::UsersController < ApplicationController

    before_action :ensure_logged_in, only:[:show]

    def index
        @users = User.all.includes(:posts, :friends)
        render :index
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        find_user
        render :show
    end

    def update
        find_user
        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end


    private

    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:email, :password, :first_name, :last_name, :birthday, :gender, :bio, :workplace, :school, :current_city, :profile_pic, :cover_photo)
    end

    def find_user
        @user = User.includes(:posts, :friends).find_by(id: params[:id])
    end
    
end

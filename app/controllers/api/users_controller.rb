class Api::UsersController < ApplicationController

    before_action :ensure_logged_in, only:[:show]
    
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
        @user = User.find_by(id: params[:id])
        @posts = @user.posts
        render :show
    end

    def update
        @user = User.find_by(id: params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: user.errors.full_messages, status: 422
        end
    end


    private

    def user_params
        params.require(:user).transform_keys(&:underscore).permit(:email, :password, :first_name, :last_name, :birthday, :gender, :bio, :workplace, :school, :current_city)
    end
    
end

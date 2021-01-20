class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )

        if @user
            login(@user)
            render "api/users/show"
        else
            render json: ["WRONG!!!"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            render json: {}
        else
            render json: ["These aren't the droids you're looking for."], status: 403
        end
end

class Api::RequestsController < ApplicationController
  def create
    request = Request.new(request_params)
    if request.save
      all_users
      render "api/users/index"
    else
      render json: request.errors.full_messages, status: 422
    end
  end

  def update
    request = Request.find_by(requester_id: request_params[:requester_id], requestee_id: request_params[:requestee_id])
    if (request_params[:status] == "accepted")
      Friendship.create_link(request.requester_id, request.requestee_id)
      request.destroy
    elsif (request_params[:status] == "declined")
      request.destroy
    end

    all_users
    render "api/users/index"
  end

  private
    def request_params
      params.require(:request).transform_keys(&:underscore).permit(:requester_id, :requestee_id, :status)
    end

    def all_users
      @users = User.all.includes(:posts, :friends, :likes)
    end
end

class SessionsController < ApplicationController
  skip_before_action :authorized, only: :login

  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      user.update!(is_login: true)
      render json: user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def logout
    user = User.find(session[:user_id])
    user.update!(is_login: false)
    session[:user_id] = nil
    render json: { message: "Logout" }, status: :accepted
  end
end

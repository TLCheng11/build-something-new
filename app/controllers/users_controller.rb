class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  before_action :find_user, only: %i[ show update destroy new_password change_image ]

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.create!(user_signup_params)
    session[:user_id] = @user[:id]
    render json: @user, status: :created
  end

  # PATCH/PUT /users/1
  def update
    @user.update!(user_params)
    render json: @user, status: :accepted
  end

  # PATCH/PUT /users_change_image
  def change_image
    byebug
    @user.update!(user_signup_params)
    if @user.image.attached?
      render json: @user, status: :accepted
    else
      render json: {error: "update failed"}, status: 405
    end
  end

  # PATCH/PUT /users_new_password
  def new_password
    if @user&.authenticate(params[:current_password]) && params[:new_password] == params[:password_confirmation]
      @user.update!(password: params[:new_password])
      render json: {message: "Password changed successfully!"}, status: :accepted
    else
      render json: {error: "Wrong password!"}, status: 405
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_user
      @user = User.find(session[:user_id])
    end

    # ---------- Strong params ----------
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :profile_img, :first_name, :last_name, :email, :introduction, :is_login, :image)
    end

    # Only for user signup
    def user_signup_params
      params.permit(:username, :password, :email, :image)
    end
end

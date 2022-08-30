class ApplicationController < ActionController::API
  include ActionController::Cookies


  before_action :authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def authorized
    return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
  end

  private
    def record_not_found(e)
      render json: { error: "#{e.model} not found" }, status: :not_found
    end

    def record_invalid(e)
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end

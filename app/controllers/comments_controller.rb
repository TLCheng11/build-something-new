class CommentsController < ApplicationController
  before_action :find_comment, only: %i[ show update destroy ]

  # POST /comments
  def create
    @comment = Comment.create!(user_id: session[:user_id], project_id: params[:project_id], comment: params[:comment], rating: params[:rating])
    render json: @comment, status: :created
  end

  # PATCH/PUT /comments/1
  def update
    @comment.update!(comment_params)
    render json: @comment, status: :accepted
  end
  
  # DELETE /comments/1
  def destroy
    @comment.destroy
    render json: {message: "comment deleted"}, status: :accepted
  end

  private
    def find_comment
      @comment = comment.find(params[:id])
    end

    def comment_params
      params.permit(:comment, :rating)
    end
end

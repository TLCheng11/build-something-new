class CommentsController < ApplicationController
  before_action :find_comment, only: %i[ show update destroy ]

  # GET /comments
  def index
    if params[:project_id]
      render json: Project.find(params[:project_id]).comments.order("updated_at DESC")
    else
      render json: Comment.all
    end
  end

  # POST /comments
  def create
    @comment = Comment.create!(user_id: session[:user_id], project_id: params[:project_id], title: params[:title], comment: params[:comment], rating: params[:rating])
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
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.permit(:title, :comment, :rating)
    end
end

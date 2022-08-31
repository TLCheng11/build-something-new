class ProjectsController < ApplicationController
  before_action :find_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    if params[:user_id]
      render json: User.find(params[:user_id]).projects
    else
      render json: Project.all
    end
  end

  # POST /projects
  def create
    @project = Project.create!(project_params)
    UserProject.create!(user_id: session[:user_id], project_id: @project[:id], allow_edit:true)
    ModelGroup.create!(project_id: @project[:id])
    render json: @project, status: :created
  end

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.permit(:title, :description, :created_by)
    end
end

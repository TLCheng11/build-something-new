class ProjectsController < ApplicationController
  before_action :find_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    if params[:user_id]
      render json: User.find(params[:user_id]).projects, each_serializer: ProjectPageSerializer, include: ["model_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres"]
    else
      render json: Project.all
    end
  end

  # GET /projects/1
  def show
    render json: @project, serializer: ProjectShowSerializer, include: ["model_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres"]
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

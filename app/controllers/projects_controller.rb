class ProjectsController < ApplicationController
  before_action :find_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    if params[:page]
      position = (params[:page].to_i - 1) * 4
      if params[:user_id]
        projects = User.find(params[:user_id]).projects.where(created_by: params[:user_id])
        if (position) < projects.length
          render json: projects.slice(position, 4), each_serializer: ProjectPageSerializer, include: ["model_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres"]
        else
          render json: {message: "page number excess searchable pages "}, status: 405
        end
      else
        projects = Project.all
        if (position) < projects.length
          render json: projects.slice(position, 4), each_serializer: ProjectPageSerializer, include: ["model_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres"]
        else
          render json: {message: "page number excess searchable pages "}, status: 405
        end
      end
    else
      render json: {message: "please enter a page number"}, status: 405
    end
  end

  # GET /projects/page_count
  def page_count
    if params[:user_id]
      page_count = (User.find(params[:user_id]).projects.where(created_by: params[:user_id]).count.to_f / 4).ceil
      render json: {page_count: page_count}
    else 
      page_count = (Project.all.count.to_f / 4).ceil
      render json: {page_count: page_count}
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

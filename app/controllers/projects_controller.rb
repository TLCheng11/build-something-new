class ProjectsController < ApplicationController
  before_action :find_project, only: %i[ show update destroy ratings data download]

  # GET /projects
  def index
    if params[:page]
      if params[:user_id]
        position = (params[:page].to_i - 1) * 4
        projects = User.find(params[:user_id]).projects.where(created_by: params[:user_id]).order("updated_at DESC")
        if (position) < projects.length
          render json: projects.slice(position, 4), each_serializer: ProjectShowSerializer
        else
          render json: {error: "page number excess searchable pages "}, status: 405
        end
      else
        position = (params[:page].to_i - 1) * 6
        projects = Project.where(on_market: true).order("updated_at DESC")
        if (position) < projects.length
          render json: projects.slice(position, 6), each_serializer: ProjectShowSerializer
        else
          render json: {error: "page number excess searchable pages "}, status: 405
        end
      end
    else
      render json: {error: "please enter a page number"}, status: 405
    end
  end

  # GET /projects_page_count
  def page_count
    if params[:user_id]
      page_count = (User.find(params[:user_id]).projects.where(created_by: params[:user_id]).count.to_f / 4).ceil
      render json: {page_count: page_count}
    else 
      page_count = (Project.where(on_market: true).count.to_f / 6).ceil
      render json: {page_count: page_count}
    end
  end

  # GET /projects/1
  def show
    render json: @project, serializer: ProjectShowSerializer, include: ["model_groups", "model_groups.child_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres"]
  end

  # GET /projects_ratings/1
  def ratings
    comments = @project.comments
    render json: {rating: comments.average(:rating).to_f, count:comments.count}
  end

  # GET /projects_data/1
  def data
    top_level_groups = @project.model_groups.where(parent_group_id: nil)
    groups_data = []
    top_level_groups.each do |group|
      groups_data.push(group.get_all_children)
    end
    creator = User.find(@project.created_by).username
    data = {id: @project.id, title: @project.title, created_by:@project.created_by, creator: creator, description: @project.description, on_market: @project.on_market, price: @project.price, sold_count: @project.sold_count, model_groups:groups_data}
    render json: data
  end

  # GET /projects_download/1
  def download
    top_level_groups = @project.model_groups.where(parent_group_id: nil)
    groups_data = []
    top_level_groups.each do |group|
      groups_data.push(group.get_all_children)
    end
    data = {title: @project.title, model_groups:groups_data}
    render json: data
  end

  # POST /projects
  def create
    @project = Project.create!(project_params)
    UserProject.create!(user_id: session[:user_id], project_id: @project[:id], allow_edit:true)
    ModelGroup.create!(project_id: @project[:id])
    render json: @project, status: :created
  end

  # PATCH/PUT /projects/1
  def update
    @project.update!(project_update_params)
    render json: @project, status: :accepted
  end
  
  # DELETE /projects/1
  def destroy
    if !@project.on_market
      @project.destroy
      render json: {message: "Project #{@project.title} deleted"}, status: :accepted
    else
      render json: {error: "project must be taken off marketplace before you can delete"}, status: 405
    end
  end

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.permit(:title, :description, :created_by)
    end

    def project_update_params
      params.permit(:title, :description, :on_market)
    end
end

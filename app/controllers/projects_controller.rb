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

  # Get /projects_favored
  def favored
    if params[:page]
      position = (params[:page].to_i - 1) * 4
      projects = User.find(session[:user_id]).projects.order("updated_at DESC").joins(:user_projects).where("user_projects.favored" => true).uniq
      if (position) < projects.length
        render json: projects.slice(position, 4), each_serializer: ProjectShowSerializer
      else
        render json: {error: "page number excess searchable pages "}, status: 405
      end
    else
      render json: {error: "please enter a page number"}, status: 405
    end
  end


  # GET /projects_page_count
  def page_count
    if params[:user_id]
      if params[:type] === "myProjects"
        page_count = (User.find(params[:user_id]).projects.where(created_by: params[:user_id]).count.to_f / 4).ceil
        render json: {page_count: page_count}
      elsif params[:type] === "favored"
        page_count = (User.find(params[:user_id]).user_projects.where(favored: true).count.to_f / 4).ceil
        render json: {page_count: page_count}
      end
    else 
      page_count = (Project.where(on_market: true).count.to_f / 6).ceil
      render json: {page_count: page_count}
    end
  end

  # GET /projects/1
  def show
    render json: @project, serializer: ProjectShowSerializer, include: ["project_setting", "model_groups", "model_groups.child_groups", "model_groups.model_planes", "model_groups.model_boxes", "model_groups.model_spheres", "model_groups.model_shapes", "model_groups.model_cylinders"]
  end

  # GET /projects_ratings/1
  def ratings
    comments = @project.comments
    render json: {rating: comments.average(:rating).to_f, count:comments.count}
  end

  # GET /projects_data/1
  def data
    # get settings
    setting = Hash.new
    @project.project_setting.attributes.each do |k, v|
      if (k != "id" && k != "project_id" && k != "created_at" && k != "updated_at")
        setting["#{k}"] = v
      end
    end

    # get all the child groups
    top_level_groups = @project.model_groups.where(parent_group_id: nil)
    groups_data = []
    top_level_groups.each do |group|
      groups_data.push(group.get_all_children)
    end
    # check if it is favored
    favored = false
    search_projects = UserProject.where(user_id: session[:user_id], project_id: params[:id])
    if search_projects.count > 0
      favored = search_projects.first.favored
    end
    # get creator info
    creator = User.find(@project.created_by).username
    # construct return data
    data = {id: @project.id, title: @project.title, created_by:@project.created_by, creator: creator, description: @project.description, on_market: @project.on_market, price: @project.price, sold_count: @project.sold_count, model_groups:groups_data, favored: favored, project_setting:setting}
    render json: data
  end

  # GET /projects_download/1
  def download
    # get settings
    setting = Hash.new
    @project.project_setting.attributes.each do |k, v|
      if (k != "id" && k != "project_id" && k != "created_at" && k != "updated_at")
        setting["#{k}"] = v
      end
    end
    # get all the child groups
    top_level_groups = @project.model_groups.where(parent_group_id: nil)
    groups_data = []
    top_level_groups.each do |group|
      groups_data.push(group.get_all_children)
    end
    data = {title: @project.title, model_groups:groups_data, project_setting:setting}
    render json: data
  end

  # POST /projects
  def create
    @project = Project.create!(project_params)
    UserProject.create!(user_id: session[:user_id], project_id: @project[:id], allow_edit:true)
    ModelGroup.create!(project_id: @project[:id])
    ProjectSetting.create!(project_id: @project[:id])
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

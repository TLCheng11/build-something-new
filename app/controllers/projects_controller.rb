class ProjectsController < ApplicationController
  # POST /projects
  def create
    @project = Project.create!(user_id: session[:user_id])
    ModelGroup.create!(project_id: @project[:id])
    render json: @project, status: :created
  end
end

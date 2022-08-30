class ProjectsController < ApplicationController
  # POST /projects
  def create
    @project = Project.create!(project_params)
    UserProject.create!(user_id: session[:user_id], project_id: @project[:id], allow_edit:true)
    ModelGroup.create!(project_id: @project[:id])
    render json: @project, status: :created
  end

  private
    def project_params
      params.permit(:title, :description, :created_by)
    end
end

class UserProjectsController < ApplicationController
  before_action :find_user_project, only: [:set_favor]

  # PATCH /user_project_set_favor/project_id
  def set_favor
    if @user_project
      @user_project.update!(favored: params[:favored])
    else
      @user_project = UserProject.create!(user_id: session[:user_id], project_id: params[:project_id], favored: params[:favored])
    end
    render json: @user_project
  end

  private
    def find_user_project
      search_projects = UserProject.where(user_id: session[:user_id], project_id: params[:project_id])
      if search_projects.count > 0
        @user_project = search_projects.first
      else
        @user_project = nil
      end
    end
end

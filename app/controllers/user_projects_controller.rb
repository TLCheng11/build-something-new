class UserProjectsController < ApplicationController

  # GET /projects_favored/1
  def favored
    favored = false
    if UserProject.where(user_id: session[:user_id], project_id: params[:project_id]).count > 0
      favored = UserProject.where(user_id: session[:user_id], project_id: params[:project_id]).first.favored
    end
    render json: favored
  end

end

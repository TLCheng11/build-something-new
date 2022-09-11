class ProjectSettingsController < ApplicationController
  def update
    @setting = Project.find(params[:id]).project_setting
    @setting.update!(setting_update_params)
    render json: @setting
  end

  private
    def setting_update_params
      params.permit(:xcamera, :ycamera, :zcamera, :bg_color, :shadow)
    end
end

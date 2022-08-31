class ModelGroupsController < ApplicationController
  # POST /model_groups
  def create
    @model_group = ModelGroup.create!(model_group_params)
    render json: @model_group, status: :created
  end

  private
    def model_group_params
      params.permit(:project_id, :group_name)
    end
end

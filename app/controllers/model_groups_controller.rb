class ModelGroupsController < ApplicationController
  before_action :find_model_group, only: [:update]

  # POST /model_groups
  def create
    @model_group = ModelGroup.create!(model_group_params)
    render json: @model_group, status: :created
  end

  # PATCH/PUT /model_group/1
  def update
    @model_group.update(model_group_update_params)
    render json: @model_group, status: :accepted
  end

  private
    def find_model_group
      @model_group = ModelGroup.find(params[:id])
    end

    def model_group_params
      params.permit(:project_id, :group_name)
    end

    def model_group_update_params
      params.permit(:xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation)
    end
end

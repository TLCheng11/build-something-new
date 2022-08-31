class ModelSpheresController < ApplicationController
  def create
    @model_sphere = ModelSphere.create!(model_sphere_params)
    render json: @model_sphere, status: :created
  end

  private
    def model_sphere_params
      params.permit(:model_group_id)
    end
end

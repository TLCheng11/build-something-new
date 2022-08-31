class ModelPlanesController < ApplicationController
  def create
    @model_plane = ModelPlane.create!(model_plane_params)
    render json: @model_plane, status: :created
  end

  private
    def model_plane_params
      params.permit(:model_group_id)
    end
end

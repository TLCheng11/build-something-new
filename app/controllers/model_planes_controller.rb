class ModelPlanesController < ApplicationController
  before_action :find_model_plane, only: [:update, :destroy]
  
  # GET /model_planes/1
  def create
    @model_plane = ModelPlane.create!(model_plane_params)
    render json: @model_plane, status: :created
  end

  # PATCH/PUT /model_planes/1
  def update
    @model_plane.update(model_plane_update_params)
    render json: @model_plane, status: :accepted
  end

  # DELETE /model_planes/1
  def destroy
    @model_plane.destroy
    render json: {message: "plane deleted"}, status: :accepted
  end

  private
    def find_model_plane
      @model_plane = ModelPlane.find(params[:id])
    end

    def model_plane_params
      params.permit(:model_group_id)
    end

    def model_plane_update_params
      params.permit(:width, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

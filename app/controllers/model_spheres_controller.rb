class ModelSpheresController < ApplicationController
  before_action :find_model_sphere, only: [:update, :destroy, :copy]
  
  # POST /model_spheres/1
  def create
    @model_sphere = ModelSphere.create!(model_sphere_params)
    render json: @model_sphere, status: :created
  end

  # POST /model_spheres_copy/1
  def copy
    new_sphere = @model_sphere.copy
    render json: new_sphere, status: :created
  end

  # PATCH/PUT /model_spheres/1
  def update
    @model_sphere.update!(model_sphere_update_params)
    render json: @model_sphere, status: :accepted
  end

  # DELETE /model_spheres/1
  def destroy
    @model_sphere.destroy
    render json: {message: "Shpere deleted"}, status: :accepted
  end

  private
    def find_model_sphere
      @model_sphere = ModelSphere.find(params[:id])
    end

    def model_sphere_params
      params.permit(:model_group_id)
    end

    def model_sphere_update_params
      params.permit(:radius, :width_segments, :height_segments, :phi_length, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

class ModelCylindersController < ApplicationController
  before_action :find_model_cylinder, only: [:update, :destroy]
  
  # GET /model_cylinders/1
  def create
    @model_cylinder = ModelCylinder.create!(model_cylinder_params)
    render json: @model_cylinder, status: :created
  end

  # PATCH/PUT /model_cylinders/1
  def update
    @model_cylinder.update!(model_cylinder_update_params)
    render json: @model_cylinder, status: :accepted
  end

  # DELETE /model_cylinders/1
  def destroy
    @model_cylinder.destroy
    render json: {message: "Cylinder deleted"}, status: :accepted
  end

  private
    def find_model_cylinder
      @model_cylinder = ModelCylinder.find(params[:id])
    end

    def model_cylinder_params
      params.permit(:model_group_id)
    end

    def model_cylinder_update_params
      params.permit(:radius_top, :radius_bottom, :height, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

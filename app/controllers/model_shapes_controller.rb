class ModelShapesController < ApplicationController
  before_action :find_model_shape, only: [:update, :destroy, :copy]
  
  # POST /model_shapes/1
  def create
    @model_shape = ModelShape.create!(model_shape_params)
    render json: @model_shape, status: :created
  end

  # POST /model_shapes_copy/1
  def copy
    new_shape = @model_shape.copy
    render json: new_shape, status: :created
  end

  # PATCH/PUT /model_shapes/1
  def update
    @model_shape.update!(model_shape_update_params)
    render json: @model_shape, status: :accepted
  end

  # DELETE /model_shapes/1
  def destroy
    @model_shape.destroy
    render json: {message: "Shape deleted"}, status: :accepted
  end

  private
    def find_model_shape
      @model_shape = ModelShape.find(params[:id])
    end

    def model_shape_params
      params.permit(:model_group_id)
    end

    def model_shape_update_params
      params.permit(:radius, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

class ModelBoxesController < ApplicationController
  before_action :find_model_box, only: [:update, :destroy]

  # GET /model_boxes/1
  def create
    @model_box = ModelBox.create!(model_box_params)
    render json: @model_box, status: :created
  end

  # PATCH/PUT /model_boxes/1
  def update
    @model_box.update(model_box_update_params)
    render json: @model_box, status: :accepted
  end

  # DELETE /model_boxes/1
  def destroy
    @model_box.destroy
    render json: {message: "box deleted"}, status: :accepted
  end

  private
    def find_model_box
      @model_box = ModelBox.find(params[:id])
    end

    def model_box_params
      params.permit(:model_group_id)
    end

    def model_box_update_params
      params.permit(:width, :height, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

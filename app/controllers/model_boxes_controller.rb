class ModelBoxesController < ApplicationController
  before_action :find_model_box, only: [:update]

  def create
    @model_box = ModelBox.create!(model_box_params)
    render json: @model_box, status: :created
  end

  # PATCH/PUT /model_box/1
  def update
    @model_box.update(model_box_update_params)
    render json: @model_box, status: :accepted
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

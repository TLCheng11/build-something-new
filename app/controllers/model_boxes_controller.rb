class ModelBoxesController < ApplicationController
  def create
    @model_box = ModelBox.create!(model_box_params)
    render json: @model_box, status: :created
  end

  private
    def model_box_params
      params.permit(:model_group_id)
    end
end

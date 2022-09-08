class ModelConesController < ApplicationController
  before_action :find_model_cone, only: [:update, :destroy]
  
  # GET /model_cones/1
  def create
    @model_cone = Modelcone.create!(model_cone_params)
    render json: @model_cone, status: :created
  end

  # PATCH/PUT /model_cones/1
  def update
    @model_cone.update!(model_cone_update_params)
    render json: @model_cone, status: :accepted
  end

  # DELETE /model_cones/1
  def destroy
    @model_cone.destroy
    render json: {message: "cone deleted"}, status: :accepted
  end

  private
    def find_model_cone
      @model_cone = Modelcone.find(params[:id])
    end

    def model_cone_params
      params.permit(:model_group_id)
    end

    def model_cone_update_params
      params.permit(:radius, :height, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color)
    end
end

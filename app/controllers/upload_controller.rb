class UploadController < ApplicationController
  # this controler only accessable by admin or tony account
  # mainly used to migrate sample model to other database on different hosting service

  def upload
    user = User.find(session[:user_id])
    if user.username == "tony" || user.username == "admin"
      @user = user
      create_project(params)
      render json: { message: "model uploaded"}
    else
      render json: { error: "user has no admin privilege" }
    end
  end

  private

    def create_project(data)
      # create project
      project = Project.create!(title: data[:title], created_by: session[:user_id])

      # create relation between user and project
      UserProject.create!(user_id: session[:user_id], project_id: project[:id], allow_edit:true)

      # create project setting
      setting = data[:project_setting]
      ProjectSetting.create!(project_id: project[:id], bg_color: setting[:bg_color], shadow: setting[:shadow], xcamera: setting[:xcamera], ycamera: setting[:ycamera], zcamera: setting[:zcamera])
      
      # loop through the model groups and create
      data[:model_groups].each {|group| create_group(project[:id], group)}
    end

    def create_group(project_id, group, parent_group_id=nil)
      # copy group setting
      new_group = ModelGroup.create!(project_id: project_id, group_name: group[:group_name], parent_group_id: parent_group_id, xposition: group[:xposition], xrotation: group[:xrotation], yposition: group[:yposition], yrotation: group[:yrotation], zposition: group[:zposition], zrotation: group[:zrotation])

      # copy each element in the group
      group[:model_planes].each do |item|
        puts item[:model_group_id]
        item[:model_group_id] = new_group[:id]
        puts item[:model_group_id]
        ModelPlane.create!(item.permit(:model_group_id, :width, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color))
      end
      
      group[:model_shapes].each do |item|
        item[:model_group_id] = new_group[:id]
        ModelShape.create!(item.permit(:model_group_id, :radius, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color))
      end

      group[:model_boxes].each do |item|
        item[:model_group_id] = new_group[:id]
        ModelBox.create!(item.permit(:model_group_id, :width, :height, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color))
      end

      group[:model_spheres].each do |item|
        item[:model_group_id] = new_group[:id]
        ModelSphere.create!(item.permit(:model_group_id, :radius, :width_segments, :height_segments, :phi_length, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color))
      end

      group[:model_cylinders].each do |item|
        item[:model_group_id] = new_group[:id]
        ModelCylinder.create!(item.permit(:model_group_id, :radius_top, :radius_bottom, :height, :segments, :theta_length, :open_ended, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color))
      end

      # recursively create child groups
      group[:child_groups].each {|group| create_group(project_id, group, new_group[:id])}
    end


end
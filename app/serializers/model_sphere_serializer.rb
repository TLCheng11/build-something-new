class ModelSphereSerializer < ActiveModel::Serializer
  attributes :id, :radius, :width_segments, :height_segments, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color,:image_url, :mass, :group
  # has_one :model_group

  def group
    {id: self.object.model_group.id, group_name: self.object.model_group.group_name}
  end
end

class ModelShapeSerializer < ActiveModel::Serializer
  attributes :id, :radius, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color,:image_url, :mass, :group
  # has_one :model_group

  def group
    group = self.object.model_group
    {id: group.id, group_name: group.group_name}
  end
end

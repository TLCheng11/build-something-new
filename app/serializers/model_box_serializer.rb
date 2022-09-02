class ModelBoxSerializer < ActiveModel::Serializer
  attributes :id, :width, :height, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color, :image_url, :mass, :group
  # has_one :model_group

  def group
    {id: self.object.model_group.id, group_name: self.object.model_group.group_name}
  end
end

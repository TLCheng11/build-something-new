class ModelGroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :parent_group_id, :parent_group_name, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation
  has_one :project
  has_many :model_planes
  has_many :model_boxes
  has_many :model_spheres
  has_many :child_groups

  # def child_groups
  #   ModelGroup.all.where(parent_group_id: self.object.id)
  # end

  def parent_group_name
    if (self.object.parent_group_id)
      ModelGroup.find(self.object.parent_group_id).group_name
    else
      "None"
    end
  end
end

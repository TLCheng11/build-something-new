class ModelGroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation
  has_one :project
  has_many :model_planes
  has_many :model_boxes
  has_many :model_spheres
end

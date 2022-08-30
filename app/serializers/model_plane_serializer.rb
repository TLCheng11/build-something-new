class ModelPlaneSerializer < ActiveModel::Serializer
  attributes :id, :width, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color, :mass
  has_one :model_group
end

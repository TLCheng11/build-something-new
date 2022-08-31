class ModelSphereSerializer < ActiveModel::Serializer
  attributes :id, :radius, :width_segments, height_segments, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color,:image_url, :mass
  has_one :model_group
end

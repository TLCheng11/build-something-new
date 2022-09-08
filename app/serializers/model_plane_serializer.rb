class ModelPlaneSerializer < ActiveModel::Serializer
  attributes :id, :width, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color, :image_url, :mass
  # has_one :model_group

end

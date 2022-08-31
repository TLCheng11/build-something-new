class ModelBoxSerializer < ActiveModel::Serializer
  attributes :id, :width, :height, :depth, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color, :image_url, :mass
  # has_one :model_group
end

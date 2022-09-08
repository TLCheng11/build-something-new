class ModelCylinderSerializer < ActiveModel::Serializer
  attributes :id, :radius_top, :radius_bottom, :height, :segments, :theta_length, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation, :color,:image_url, :mass
  # has_one :model_group
end

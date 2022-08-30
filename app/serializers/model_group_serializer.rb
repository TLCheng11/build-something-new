class ModelGroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation
  has_one :project
end

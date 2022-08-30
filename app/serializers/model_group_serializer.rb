class ModelGroupSerializer < ActiveModel::Serializer
  attributes :id, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation
  has_one :project
end

class ProjectShowSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :model_groups
end

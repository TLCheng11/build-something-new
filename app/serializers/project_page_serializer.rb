class ProjectPageSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :title, :tags, :description, :on_market, :price, :sold_count

  has_many :model_groups
end

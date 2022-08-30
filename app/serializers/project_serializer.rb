class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :name, :tags, :description, :on_market, :price, :sold_count
end

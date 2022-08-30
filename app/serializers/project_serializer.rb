class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :title, :tags, :description, :on_market, :price, :sold_count
end

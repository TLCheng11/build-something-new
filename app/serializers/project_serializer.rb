class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :name, :on_market, :price, :sold_count
end

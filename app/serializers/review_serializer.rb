class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating
  has_one :project
  has_one :user
end

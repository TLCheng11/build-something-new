class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :comment, :rating
  # has_one :project
  has_one :user, serializer: UserShowSerializer
end

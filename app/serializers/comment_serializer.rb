class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :comment, :rating, :updated_at
  # has_one :project
  has_one :user, serializer: UserShowSerializer
end

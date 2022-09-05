class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :is_login
end

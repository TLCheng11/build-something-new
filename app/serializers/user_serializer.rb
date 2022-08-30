class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :dob, :profile_img, :introduction, :is_login
end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :password_digest, :first_name, :last_name, :dob, :profile_img, :introduction, :is_login
end

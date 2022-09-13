class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :is_login, :image_url

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, host: "local")
    end
  end
end

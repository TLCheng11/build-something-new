class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :email, uniqueness: true
end

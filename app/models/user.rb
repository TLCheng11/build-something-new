class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :email, uniqueness: true, presence: true

  has_many :user_projects
  has_many :projects, through: :user_projects
end

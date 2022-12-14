class Project < ApplicationRecord
  validates :title, uniqueness: true, presence: true
  validates :created_by, presence: true

  has_many :user_projects, dependent: :destroy
  has_many :users, through: :user_projects
  has_many :model_groups, dependent: :destroy
  has_one :project_setting, dependent: :destroy
  has_many :comments, dependent: :destroy
end

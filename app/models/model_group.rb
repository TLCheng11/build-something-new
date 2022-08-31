class ModelGroup < ApplicationRecord
  validates :group_name, uniqueness: {scope: :project_id}, presence: true

  belongs_to :project
  has_many :model_planes, dependent: :destroy
  has_many :model_boxes, dependent: :destroy
  has_many :model_spheres, dependent: :destroy
end

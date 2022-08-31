class ModelGroup < ApplicationRecord
  belongs_to :project
  has_many :model_planes, dependent: :destroy
  has_many :model_boxes, dependent: :destroy
  has_many :model_spheres, dependent: :destroy
end

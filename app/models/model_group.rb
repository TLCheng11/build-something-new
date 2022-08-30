class ModelGroup < ApplicationRecord
  belongs_to :project
  has_many :model_planes
  has_many :model_boxes
  has_many :model_spheres
end

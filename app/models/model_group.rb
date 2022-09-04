class ModelGroup < ApplicationRecord
  validates :group_name, uniqueness: {scope: :project_id}, presence: true

  belongs_to :project
  has_many :model_planes, dependent: :destroy
  has_many :model_boxes, dependent: :destroy
  has_many :model_spheres, dependent: :destroy

  has_one :parent_group, :class_name => "ModelGroup"
  has_many :child_groups, :class_name => "ModelGroup", :foreign_key => "parent_group_id"

  def child_groups_list
    list = [self.id]
    find_child_groups(list, self)
    list
  end

  private
    def find_child_groups(list = [], group)
      children = ModelGroup.where(parent_group_id: group.id)
      if children.count > 0
        children.each do |group|
          list.push(group.id)
          find_child_groups(list, group)
        end
      end
    end
end

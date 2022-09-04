class ModelGroup < ApplicationRecord
  validates :group_name, uniqueness: {scope: :project_id}, presence: true

  belongs_to :project
  has_many :model_planes, dependent: :destroy
  has_many :model_boxes, dependent: :destroy
  has_many :model_spheres, dependent: :destroy

  has_one :parent_group, :class_name => "ModelGroup"
  has_many :child_groups, :class_name => "ModelGroup", :foreign_key => "parent_group_id"

  def attach_children_to_parent
    if self.child_groups.count > 0
      self.child_groups.each do |group|
        group.update!(parent_group_id: self.parent_group_id)
      end
    end
  end

  def child_groups_list
    list = [self.id]
    find_child_groups(list, self)
    list
  end

  # wip
  # def is_child?(id, group)
  #   children = group.child_groups
  #   if children.count > 0
  #     children.each do |g|
  #       puts id
  #       puts g.id
  #       if g.id == id
  #         return true
  #       end
  #       return is_child?(id, g)
  #     end
  #   end
  #   false
  # end

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

class ModelGroup < ApplicationRecord
  validates :group_name, uniqueness: {scope: :project_id}, presence: true

  belongs_to :project
  has_many :model_planes, dependent: :destroy
  has_many :model_boxes, dependent: :destroy
  has_many :model_spheres, dependent: :destroy
  has_many :model_shapes, dependent: :destroy
  has_many :model_cylinders, dependent: :destroy

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

  def get_all_children
    group = {id: self.id, group_name: self.group_name, parent_group_id: self.parent_group_id, xposition: self.xposition, yposition: self.yposition, zposition: zposition, xrotation: xrotation, yrotation: yrotation, zrotation: zrotation}
    group[:model_planes] = data_except_date(self.model_planes)
    group[:model_boxes] = data_except_date(self.model_boxes)
    group[:model_spheres] = data_except_date(self.model_spheres)
    group[:model_shapes] = data_except_date(self.model_shapes)
    group[:model_cylinders] = data_except_date(self.model_cylinders)
    group[:child_groups] = []
      if self.child_groups.count > 0
        self.child_groups.each do |child|
          group[:child_groups].push(child.get_all_children)
        end
      end
    return group
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

    def data_except_date(models)
      models_without_date = models.map do |model|
        modelHash = Hash.new
        model.attributes.each do |k, v|
          if (k != "created_at" && k != "updated_at")
            modelHash["#{k}"] = v
          end
        end
        modelHash
      end
      models_without_date
    end
end

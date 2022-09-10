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

  def copy(pos = 1, group_id = 0)
    # to create first group layer
    attributes = Hash.new
    self.attributes.each do |k, v|
      if (k == "project_id" || k == "xposition" || k == "xrotation" || k == "yrotation" || k == "zrotation")
        attributes["#{k}"] = v
      elsif (k == "yposition" || k == "zposition")
        attributes["#{k}"] = v + pos
      elsif (k == "parent_group_id")
        attributes["#{k}"] = group_id > 0 ? group_id : v
      elsif (k == "group_name")
        attributes["#{k}"] = v + "(" + Time.now.iso8601 + ")"
      end
    end
    new_group = ModelGroup.create!(attributes)

    
    # to create all child groups
    self.child_groups.each do |group|
      group.copy(0, new_group.id)
    end

    # to create all child models
    self.model_planes.each do |plane|
      plane.copy(0, new_group.id)
    end
    self.model_shapes.each do |shape|
      shape.copy(0, new_group.id)
    end
    self.model_boxes.each do |box|
      box.copy(0, new_group.id)
    end
    self.model_spheres.each do |sphere|
      sphere.copy(0, new_group.id)
    end
    self.model_cylinders.each do |cylinder|
      cylinder.copy(0, new_group.id)
    end

    new_group
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

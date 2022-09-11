class ModelSphere < ApplicationRecord
  belongs_to :model_group

  def copy(pos = 1, group_id = 0)
    attributes = Hash.new
    self.attributes.each do |k, v|
      if (k != "created_at" && k != "updated_at" && k != "id")
        if (k == "zposition")
          attributes["#{k}"] = v + pos
        elsif (k == "model_group_id")
          attributes["#{k}"] = group_id > 0 ? group_id : v
        else
          attributes["#{k}"] = v
        end
      end
    end
    ModelSphere.create!(attributes)
  end
end

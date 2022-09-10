class ModelCylinder < ApplicationRecord
  belongs_to :model_group

  def copy(pos = 1)
    attributes = Hash.new
    self.attributes.each do |k, v|
      if (k != "created_at" && k != "updated_at" && k != "id")
        if (k == "yposition" || k == "zposition")
          attributes["#{k}"] = v + pos
        else
          attributes["#{k}"] = v
        end
      end
    end
    ModelCylinder.create!(attributes)
  end
end

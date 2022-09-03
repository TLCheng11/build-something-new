class ProjectPageSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :creator, :title, :tags, :description, :on_market, :price, :sold_count

  has_many :model_groups

  def creator
    User.find(self.object.created_by).username
  end
end

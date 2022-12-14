class ProjectShowSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :creator, :title, :tags, :description, :on_market, :price, :sold_count

  has_many :model_groups
  has_one :project_setting

  def creator
    User.find(self.object.created_by).username
  end

  # def overall_rating
  #   self.object.comments.average(:rating).to_f
  # end

  # def rating_count
  #   self.object.comments.count
  # end
end

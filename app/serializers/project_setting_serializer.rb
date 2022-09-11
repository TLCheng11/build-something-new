class ProjectSettingSerializer < ActiveModel::Serializer
  attributes :id, :xcamera, :ycamera, :zcamera, :bg_color, :shadow
  has_one :project
end

class Comment < ApplicationRecord
  # validates :user_id, uniqueness: {scope: :project_id}, presence: true
  validates :title, presence: true

  belongs_to :project
  belongs_to :user
end

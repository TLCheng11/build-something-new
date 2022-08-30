class CreateModelGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :model_groups do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.string :group_name, default: "New Group"
      t.float :xposition, default: 0
      t.float :yposition, default: 0
      t.float :zposition, default: 0
      t.float :xrotation, default: 0
      t.float :yrotation, default: 0
      t.float :zrotation, default: 0

      t.timestamps
    end
  end
end

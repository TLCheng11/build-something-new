class CreateModelGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :model_groups do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.float :xposition
      t.float :yposition
      t.float :zposition
      t.float :xrotation
      t.float :yrotation
      t.float :zrotation

      t.timestamps
    end
  end
end

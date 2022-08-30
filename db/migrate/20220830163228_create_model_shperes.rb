class CreateModelShperes < ActiveRecord::Migration[7.0]
  def change
    create_table :model_shperes do |t|
      t.belongs_to :model_group, null: false, foreign_key: true
      t.float :width
      t.float :depth
      t.float :xposition
      t.float :yposition
      t.float :zposition
      t.float :xrotation
      t.float :yrotation
      t.float :zrotation
      t.string :color
      t.float :mass

      t.timestamps
    end
  end
end

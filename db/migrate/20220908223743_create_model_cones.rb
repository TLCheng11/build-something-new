class CreateModelCones < ActiveRecord::Migration[7.0]
  def change
    create_table :model_cones do |t|
      t.belongs_to :model_group, null: false, foreign_key: true
      t.float :radius, default: 0.5
      t.float :height, default: 1
      t.float :segments, default: 16
      t.float :theta_length, default: 360
      t.float :xposition, default: 0
      t.float :yposition, default: 4
      t.float :zposition, default: 0
      t.float :xrotation, default: 0
      t.float :yrotation, default: 0
      t.float :zrotation, default: 0
      t.string :color
      t.string :image_url
      t.float :mass, default: 1

      t.timestamps
    end
  end
end

class CreateProjectSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :project_settings do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.float :xcamera, default: 5
      t.float :ycamera, default: 5
      t.float :zcamera, default: 5
      t.string :bg_color, default: "#9CA3AF"
      t.boolean :shadow, default: true

      t.timestamps
    end
  end
end

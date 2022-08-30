class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.integer :created_by
      t.string :name
      t.boolean :on_market
      t.float :price
      t.integer :sold_count

      t.timestamps
    end
  end
end

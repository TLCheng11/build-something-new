class AddParentGroupIdToModelGroups < ActiveRecord::Migration[7.0]
  def change
    add_column :model_groups, :parent_group_id, :integer
  end
end

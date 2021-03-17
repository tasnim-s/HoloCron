class ChangePendingColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :requests, :pending
    add_column :requests, :status, :string, default: "requested"
  end
end

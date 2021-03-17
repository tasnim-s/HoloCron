class RemoveIndexRequests < ActiveRecord::Migration[5.2]
  def change
    remove_index :requests, :requester_id
    remove_index :requests, :requestee_id
    add_index(:requests, [:requester_id, :requestee_id], unique: true)
  end
end

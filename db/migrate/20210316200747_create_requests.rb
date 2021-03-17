class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.integer :requester_id, null: false, index: true
      t.integer :requestee_id, null: false, index: true
      t.boolean :pending, default: true

      t.timestamps
    end
  end
end

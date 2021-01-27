class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :content, null: false
      t.integer :creator_id, null: false, index: true

      t.timestamps
    end
  end
end

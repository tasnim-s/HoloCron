class AddIndexWall < ActiveRecord::Migration[5.2]
  def change
    add_index(:posts, :wall_id)
  end
end

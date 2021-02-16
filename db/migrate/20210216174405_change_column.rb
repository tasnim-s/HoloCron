class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :likes, :user_id, :liker_id
  end
end

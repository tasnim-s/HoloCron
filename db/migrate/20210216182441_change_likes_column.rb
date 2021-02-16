class ChangeLikesColumn < ActiveRecord::Migration[5.2]
  def change
    change_column_null :likes, :liker_id, false
  end
end

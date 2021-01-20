class Update < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :bio, true
    change_column_null :users, :workplace, true
    change_column_null :users, :school, true
    change_column_null :users, :current_city, true
  end
end

class AddColorAndSwordsCol < ActiveRecord::Migration
  def change
    add_column :quests, :fav_color, :string
    add_column :quests, :swords, :integer
  end
end

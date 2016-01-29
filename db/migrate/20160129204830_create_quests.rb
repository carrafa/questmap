class CreateQuests < ActiveRecord::Migration
  def change
    create_table :quests do |t|
      t.decimal :lat
      t.decimal :lon
      t.string :name
      t.string :quest

      t.timestamps null: false
    end
  end
end

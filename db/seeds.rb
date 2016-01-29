# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Quest.destroy_all

Quest.create({lat: 40, lon:-70, name: "carolina", quest: "took a swim" })
Quest.create({lat: 41, lon:-72, name: "carolina", quest: "ate a donut" })
Quest.create({lat: 54, lon:-82, name: "carolina", quest: "fell" })
Quest.create({lat: 51, lon:-80, name: "josh", quest: "ate an oyster" })
Quest.create({lat: 46, lon:-78, name: "josh", quest: "donut and oyster sandwich. yum." })

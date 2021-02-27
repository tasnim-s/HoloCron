# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.destroy_all
Post.destroy_all
Comment.destroy_all
Like.destroy_all

demo = User.create(first_name: "Grogu", last_name: "Yoda", email: "player1", password: 'player1', birthday: 'Apr 1, 2020', gender: 'Male', bio: 'May the force be with you.', workplace: 'Jedi Temple', school: 'Jedi Academy', current_city: 'Coruscant')

user1 = User.create(first_name: "Kobe", last_name: "Bryant", email: "kobe@bryant", password: 'password', birthday: 'Jan 26, 2020', gender: 'Male', bio: 'Laker Legend', workplace: 'Lakers', school: 'Lower Merion HS', current_city: 'Los Angelos')

10.times do
    name = Faker::Movies::StarWars.unique.character
    first_name, last_name = name.split(" ")
    email = name.split(" ").join("@")
    bio = Faker::Movies::StarWars.specie
    workplace = Faker::Movies::HarryPotter.location
    school = Faker::Movies::HarryPotter.house
    current_city = Faker::Movies::StarWars.planet

    User.create(first_name: first_name, last_name: last_name, email: email, password: 'password', birthday: 'Apr 1, 2020', gender: 'Non-binary', bio: bio, workplace: workplace, school: school, current_city: current_city)
end

users = User.all

users.each do |user|
    Friendship.create_link(demo.id, user.id) unless demo.id == user.id
    3.times do
        content = Faker::Movies::StarWars.unique.quote
        Post.create(content: content, creator_id: user.id)
    end
end

demo.cover_photo.attach(io: File.open("app/assets/images/bernie_totoro.jpg"), filename: "bernie.jpg")
user1.cover_photo.attach(io: File.open("app/assets/images/kobe.jpg"), filename: "kobe.jpg")

demo.profile_pic.attach(io: File.open("app/assets/images/babyYoda.jpg"), filename: "grogu.jpg")
user1.profile_pic.attach(io: File.open("app/assets/images/kobegigi.jpg"), filename: "kobegigi.jpg")



comment1 = Comment.create(content: "Demo Comment", commenter_id: demo.id, post_id: demo.posts[0].id)
comment4 = Comment.create(content: "Are you the same animal, and a different beast?", commenter_id: user1.id, post_id: demo.posts[0].id)



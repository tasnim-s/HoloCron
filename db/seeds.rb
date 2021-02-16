# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all
Comment.destroy_all
Like.destroy_all

demo = User.create(first_name: "Grogu", last_name: "Yoda", email: "player1", password: 'player1', birthday: 'Apr 1, 2020', gender: 'Male', bio: 'May the force be with you.', workplace: 'Jedi Temple', school: 'Jedi Academy', current_city: 'Coruscant')

demo.cover_photo.attach(io: File.open("app/assets/images/bernie_totoro.jpg"), filename: "bernie.jpg")

demo.profile_pic.attach(io: File.open("app/assets/images/babyYoda.jpg"), filename: "grogu.jpg")

post1 = Post.create(content: "Demo Post", creator_id: demo.id)
post2 = Post.create(content: "Demo Post2", creator_id: demo.id)

comment1 = Comment.create(content: "Demo Comment", commenter_id: demo.id, post_id: post1.id)
comment2 = Comment.create(content: "Demo Comment2", commenter_id: demo.id, post_id: post1.id)
comment3 = Comment.create(content: "Demo Comment3", commenter_id: demo.id, post_id: post2.id)

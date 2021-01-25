json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
json.photoUrl url_for(user.profile_pic)
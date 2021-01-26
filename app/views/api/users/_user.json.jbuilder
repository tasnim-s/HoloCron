json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
json.propicUrl url_for(user.profile_pic)
json.coverUrl url_for(user.cover_photo)
json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
json.extract! user, :bio if user.bio
json.extract! user, :workplace if user.workplace
json.extract! user, :school if user.school
json.extract! user, :current_city if user.current_city
json.propicUrl url_for(user.profile_pic) if user.profile_pic.attached?
json.coverUrl url_for(user.cover_photo) if user.cover_photo.attached?
json.posts user.posts
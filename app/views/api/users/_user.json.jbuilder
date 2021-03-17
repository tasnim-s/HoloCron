json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :friend_ids
json.extract! user, :bio if user.bio
json.extract! user, :workplace if user.workplace
json.extract! user, :school if user.school
json.extract! user, :current_city if user.current_city
json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
json.coverPhoto url_for(user.cover_photo) if user.cover_photo.attached?
json.received_requests user.received_requests.pluck(:requester_id)
json.sent_requests user.sent_requests.pluck(:requestee_id)

json.posts user.posts.each do |post|
    json.partial! "/api/posts/post.json", post: post
end


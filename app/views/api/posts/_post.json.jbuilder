json.key_format! camelize: :lower
json.extract! post, :id, :content, :created_at, :likes
json.image url_for(post.image) if post.image.attached?

json.creator do
    user = post.creator
    json.key_format! camelize: :lower
    json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
    json.extract! user, :bio if user.bio
    json.extract! user, :workplace if user.workplace
    json.extract! user, :school if user.school
    json.extract! user, :current_city if user.current_city
    json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
    json.coverPhoto url_for(user.cover_photo) if user.cover_photo.attached?
end

json.comments post.comments.each do |comment|
    json.partial! 'api/comments/comment.json', comment: comment
end
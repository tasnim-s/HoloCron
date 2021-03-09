json.key_format! camelize: :lower
json.extract! post, :id, :content, :created_at
json.image url_for(post.image) if post.image.attached?


json.likers post.likes.pluck(:liker_id)

json.creator do
    user = post.creator
    json.key_format! camelize: :lower
    json.extract! user, :id, :first_name, :last_name
    json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
end

json.comments post.comments.each do |comment|
    json.partial! 'api/comments/comment.json', comment: comment
end
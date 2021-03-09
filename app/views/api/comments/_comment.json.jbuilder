json.key_format! camelize: :lower
json.extract! comment, :id, :content, :post_id, :created_at

json.likers comment.likes.pluck(:liker_id)

json.commenter do
    user = comment.commenter
    json.key_format! camelize: :lower
    json.extract! user, :id, :first_name, :last_name
    json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
end
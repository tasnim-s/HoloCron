json.key_format! camelize: :lower
json.extract! comment, :id, :content, :post_id, :created_at

json.likers comment.likes.pluck(:liker_id)

json.commenter do
    user = comment.commenter
    json.key_format! camelize: :lower
    json.extract! user, :id, :first_name, :last_name
    json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
end

json.sub_comments comment.sub_comments.each do |sub_comment|
    json.key_format! camelize: :lower
    json.extract! sub_comment, :id, :content, :post_id, :created_at, :parent_id

    json.likers sub_comment.likes.pluck(:liker_id)

    json.commenter do
        user = sub_comment.commenter
        json.key_format! camelize: :lower
        json.extract! user, :id, :first_name, :last_name
        json.profilePic url_for(user.profile_pic) if user.profile_pic.attached?
    end
end
json.key_format! camelize: :lower
json.extract! comment, :id, :content, :commenter_id, :post_id, :created_at

json.likers comment.likes.pluck(:liker_id)
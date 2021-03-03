json.key_format! camelize: :lower
json.extract! comment, :id, :content, :commenter_id, :post_id, :created_at

json.likes comment.likes.each do |like|
    json.key_format! camelize: :lower
    json.extract! like, :liker_id
end
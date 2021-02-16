json.key_format! camelize: :lower
json.extract! post, :id, :content, :creator_id, :created_at, :comments
json.image url_for(post.image) if post.image.attached?
json.likes post.likes
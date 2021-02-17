json.key_format! camelize: :lower
json.extract! post, :id, :content, :creator_id, :created_at, :comment_ids, :likes
json.image url_for(post.image) if post.image.attached?
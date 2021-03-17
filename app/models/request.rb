class Request < ApplicationRecord
    validates :requester_id, uniqueness: { scope: :requestee_id }
    belongs_to :requester, class_name: :User

    belongs_to :requestee, class_name: :User
end

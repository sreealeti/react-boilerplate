class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  def self.from_token_request request
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by username: username
  end
  def to_token_payload
        {
            sub: id,
            username: username,
            role: role
        }
   end
end

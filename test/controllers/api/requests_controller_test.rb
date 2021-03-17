require 'test_helper'

class Api::RequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_requests_create_url
    assert_response :success
  end

  test "should get update" do
    get api_requests_update_url
    assert_response :success
  end

end

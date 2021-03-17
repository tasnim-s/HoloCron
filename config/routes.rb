Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create, :show, :update, :index]
    
    resources :friendships, only: [:destroy]

    resource :session, only: [:create, :destroy]

    resources :posts, only: [:index, :destroy, :update, :show, :create]

    resources :comments, only: [:destroy, :update, :show, :index, :create]
    
    resources :likes, only: [:create, :destroy]

    resources :requests, only: [:create, :update]
    
  end

  root "static_pages#root"
end

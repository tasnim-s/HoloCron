Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create, :show, :update, :index] do
      resources :posts, only: [:create]
      resources :comments, only: [:create]
    end
    resources :friendships, only: [:create, :destroy]

    resource :session, only: [:create, :destroy]

    resources :posts, only: [:index, :destroy, :update, :show] do
      resources :likes, only: [:create, :destroy]
    end

    resources :comments, only: [:destroy, :update, :show, :index] do
      resources :likes, only: [:create, :destroy]
    end
    
  end

  root "static_pages#root"
end

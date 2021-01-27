Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do
      resources :posts, only: [:create]
    end
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:destroy, :update, :show]
  end

  root "static_pages#root"
end

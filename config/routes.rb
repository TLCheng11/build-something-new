Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
  
  # route for sessions controller
    get "/auth", to: "users#show"
    post "/login", to: "sessions#login"
    post "/logout", to: "sessions#logout"
  
  # routes for all model controllers
    resources :users, only: [:create]
    resources :users, only: [:show] do
      resources :projects, only: [:index]
    end
    resources :projects, only: [:show, :create]
    resources :model_groups, only: [:create, :update]
    resources :model_planes, only: [:create, :update]
    resources :model_boxes, only: [:create]
    resources :model_spheres, only: [:create]

  # redirect to frontend routing
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }

end

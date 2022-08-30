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
    # resources :projects
    # resources :model_groups
    # resources :model_planes
    # resources :model_boxes
    # resources :model_shperes

  # redirect to frontend routing
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }

end

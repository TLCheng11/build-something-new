Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
  
  # route for sessions controller
    get "/auth", to: "users#show"
    post "/login", to: "sessions#login"
    post "/logout", to: "sessions#logout"
  
  # routes for all model controllers
    # users
    resources :users, only: [:create]

    # projects
    resources :users, only: [:show] do
      resources :projects, only: [:index]
    end
    resources :projects, only: [:index, :show, :create]
    get "/projects_page_count", to:"projects#page_count"
    get "/users/:user_id/projects_page_count", to: "projects#page_count"

    # model_groups
    resources :model_groups, only: [:show, :create, :update, :destroy]
    patch "/model_groups/:id/attach", to: "model_groups#attach"
    patch "/model_groups/:id/detach", to: "model_groups#detach"

    # models
    resources :model_planes, only: [:create, :update, :destroy]
    resources :model_boxes, only: [:create, :update, :destroy]
    resources :model_spheres, only: [:create, :update, :destroy]

  # redirect to frontend routing
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }

end

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
    resources :projects, only: [:index, :show, :create, :update, :destroy]
    get "/projects_page_count", to:"projects#page_count"
    get "/users/:user_id/projects_page_count", to: "projects#page_count"
    get "/projects_ratings/:id", to:"projects#ratings"
    get "/projects_data/:id", to:"projects#data"
    get "/projects_download/:id", to:"projects#download"
    get "/projects_favored", to:"projects#favored"

    # user_projects
    patch "/user_projects_set_favor/:project_id", to:"user_projects#set_favor"

    # comments
    resources :comments, only: [:create, :update, :destroy]
    resources :projects, only: [:show] do
      resources :comments, only: [:index]
    end

    # model_groups
    resources :model_groups, only: [:show, :create, :update, :destroy]
    patch "/model_groups/:id/attach", to: "model_groups#attach"
    patch "/model_groups/:id/detach", to: "model_groups#detach"

    # models
    resources :model_planes, only: [:create, :update, :destroy]
    resources :model_boxes, only: [:create, :update, :destroy]
    resources :model_spheres, only: [:create, :update, :destroy]
    resources :model_shapes, only: [:create, :update, :destroy]
    resources :model_cylinders, only: [:create, :update, :destroy]

  # redirect to frontend routing
    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }

end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"

  # route for sessions controller
  get "/auth", to: "users#show"
  post "/login", to: "sessions#login"
  post "/logout", to: "sessions#logout"
  
  resources :users, only: [:create]

  # redirect to frontend routing
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end

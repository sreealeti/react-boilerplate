Rails.application.routes.draw do
  scope '/api' do
    resources :users
  resources :recipes
    post 'user_token' => 'user_token#create'
  end
end

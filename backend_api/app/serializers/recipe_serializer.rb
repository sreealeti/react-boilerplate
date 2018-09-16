class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description
  has_many :directions
  has_many :ingredients
end

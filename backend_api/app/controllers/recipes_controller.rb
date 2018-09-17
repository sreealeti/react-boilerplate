class RecipesController < ApplicationController
  before_action :authenticate_user
  before_action :set_recipe, only: [:show, :update, :destroy]

  # GET /recipes
  def index
    @recipes = Recipe.all

    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: recipe_json(@recipe)
  end

  # POST /recipes
  def create
    r = recipe_params.to_h
    r["directions_attributes"] = JSON.parse(recipe_params[:directions])
    r["ingredients_attributes"] = JSON.parse(recipe_params[:ingredients])
    r.except!("directions").except!("ingredients")
    @recipe = current_user.recipes.build(r)

    if @recipe.save
      render json: @recipe, status: :created, location: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recipes/1
  def update
    r = recipe_params.to_h
    r["directions_attributes"] = JSON.parse(recipe_params[:directions])
    r["ingredients_attributes"] = JSON.parse(recipe_params[:ingredients])
    r.except!("directions").except!("ingredients")
    if @recipe.update_attributes(r)
      render json: { result: :ok }
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy
  end
  private
  def recipe_json(recipe)
    {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      photo_small_url: recipe.photo.url(:meduim),
      photo_lg_url: recipe.photo.url(:large),
      photo_url: recipe.photo.url,
      photo_name: recipe.photo_file_name,
      errors: recipe.errors,
      ingredients_attributes: recipe.ingredients.map do |ingredient|
        {
          id: ingredient.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          _destroy: ingredient._destroy
        }
      end,
      directions_attributes: recipe.directions.map do |direction|
        {
          id: direction.id,
          step: direction.step,
          _destroy: direction._destroy
        }
      end
    }
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def recipe_params
    params.require(:recipe).permit(:title, :description, :photo, :ingredients, :directions, ingredients_attributes: [:id, :name, :quantity, :_destroy], directions_attributes: [:id, :step, :_destroy] )
  end
end

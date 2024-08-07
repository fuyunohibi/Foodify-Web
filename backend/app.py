from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
db = SQLAlchemy(app)


# Recipe Model
class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    def json(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients,
            "instructions": self.instructions,
        }


db.create_all()


# Routes
@app.route("/recipes", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify(
        [
            {
                "id": recipe.id,
                "title": recipe.title,
                "ingredients": recipe.ingredients,
                "instructions": recipe.instructions,
            }
            for recipe in recipes
        ]
    )


@app.route("/recipe", methods=["POST"])
def add_recipe():
    title = request.json["title"]
    ingredients = request.json["ingredients"]
    instructions = request.json["instructions"]
    new_recipe = Recipe(title=title, ingredients=ingredients, instructions=instructions)
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(
        {
            "id": new_recipe.id,
            "title": new_recipe.title,
            "ingredients": new_recipe.ingredients,
            "instructions": new_recipe.instructions,
        }
    )


@app.route("/recipe/<int:id>", methods=["GET"])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    return jsonify(
        {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "instructions": recipe.instructions,
        }
    )


@app.route("/recipe/<int:id>", methods=["PUT"])
def update_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    title = request.json["title"]
    ingredients = request.json["ingredients"]
    instructions = request.json["instructions"]
    recipe.title = title
    recipe.ingredients = ingredients
    recipe.instructions = instructions
    db.session.commit()
    return jsonify(
        {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "instructions": recipe.instructions,
        }
    )


@app.route("/recipe/<int:id>", methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    db.session.delete(recipe)
    db.session.commit()
    return jsonify(
        {
            "id": recipe.id,
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "instructions": recipe.instructions,
        }
    )
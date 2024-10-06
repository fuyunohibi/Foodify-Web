from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
db = SQLAlchemy(app)


# Recipe Model
class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.today())
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    level = db.Column(db.String(10), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    authorAvatar = db.Column(db.String(255), nullable=True)
    steps = db.Column(db.ARRAY(db.String), nullable=False)

    def json(self):
        return {
            "id": self.id,
            "author": self.author,
            "date": self.date.strftime("%d %B, %Y"),
            "title": self.title,
            "description": self.description,
            "level": self.level,
            "duration": self.duration,
            "calories": self.calories,
            "image": self.image,
            "authorAvatar": self.authorAvatar,
            "steps": self.steps,
        }


db.create_all()


# Routes
@app.route("/recipes", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.json() for recipe in recipes])


@app.route("/recipe", methods=["POST"])
def add_recipe():
    data = request.json
    level = data.get("level")
    if level not in ["Easy", "Medium", "Hard"]:
        return (
            jsonify({"error": "Invalid level. Must be 'Easy', 'Medium', or 'Hard'."}),
            400,
        )

    new_recipe = Recipe(
        author=data["author"],
        title=data["title"],
        description=data["description"],
        level=level,
        duration=data["duration"],
        calories=data["calories"],
        image=data["image"],
        authorAvatar=data["authorAvatar"],
        steps=data["steps"],
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.json())


@app.route("/recipe/<int:id>", methods=["GET"])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    return jsonify(recipe.json())


@app.route("/recipe/<int:id>", methods=["PUT"])
def update_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    data = request.json
    level = data.get("level")
    if level not in ["Easy", "Medium", "Hard"]:
        return (
            jsonify({"error": "Invalid level. Must be 'Easy', 'Medium', or 'Hard'."}),
            400,
        )

    recipe.author = data["author"]
    recipe.title = data["title"]
    recipe.description = data["description"]
    recipe.level = level
    recipe.duration = data["duration"]
    recipe.calories = data["calories"]
    recipe.image = data["image"]
    recipe.authorAvatar = data["authorAvatar"]
    recipe.steps = data["steps"]

    db.session.commit()
    return jsonify(recipe.json())


@app.route("/recipe/<int:id>", methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    db.session.delete(recipe)
    db.session.commit()
    return jsonify(recipe.json())

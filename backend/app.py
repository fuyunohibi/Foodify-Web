from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


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
            "date": self.date.strftime("%d %B, %Y %H:%M:%S"),
            "title": self.title,
            "description": self.description,
            "level": self.level,
            "duration": self.duration,
            "calories": self.calories,
            "image": self.image,
            "authorAvatar": self.authorAvatar,
            "steps": self.steps,
        }


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.today())

    def json(self):
        return {"id": self.id, "email": self.email, "username": self.username}


db.create_all()

SECRET_KEY = environ.get("SECRET_KEY")


# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# Helper function to generate JWT token
def generate_token(user):
    payload = {
        "user_id": user.id,
        "exp": datetime.today() + timedelta(hours=24),  # Token valid for 24 hours
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "Email already exists!"}), 400

    hashed_password = generate_password_hash(data["password"], method="sha256")

    new_user = User(
        email=email,
        username=data["username"],
        password=hashed_password,
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.json()), 201


@app.route("/auth/signin", methods=["POST"])
def signin():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if user and check_password_hash(user.password, data["password"]):
        token = generate_token(user)
        return jsonify(
            {"message": "Login successful", "token": token, "user": user.json()}
        )
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.json() for user in users])


@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.json())


@app.route("/users/<int:id>", methods=["PUT"])
# @token_required
def update_user(current_user, id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.id != current_user.id:
        return (
            jsonify({"error": "You do not have permission to update this user."}),
            403,
        )

    data = request.json
    if "username" in data:
        user.username = data["username"]
    if "email" in data:
        user.email = data["email"]
    if "password" in data:
        user.password = generate_password_hash(data["password"], method="sha256")

    db.session.commit()
    return jsonify(user.json())


@app.route("/users/<int:id>", methods=["DELETE"])
# @token_required
def delete_user(current_user, id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.id != current_user.id:
        return (
            jsonify({"error": "You do not have permission to delete this user."}),
            403,
        )

    db.session.delete(user)
    db.session.commit()
    return jsonify(user.json())


# Recipe routes
@app.route("/recipes", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.json() for recipe in recipes])


# @app.route("/recipes", methods=["POST"])
# @token_required
# def add_recipe(current_user):
#     data = request.json
#     level = data.get("level")
#     if level not in ["Easy", "Medium", "Hard"]:
#         return (
#             jsonify({"error": "Invalid level. Must be 'Easy', 'Medium', or 'Hard'."}),
#             400,
#         )

#     new_recipe = Recipe(
#         author=current_user.username,  # Use current_user's username
#         title=data["title"],
#         description=data["description"],
#         level=level,
#         duration=data["duration"],
#         calories=data["calories"],
#         image=data["image"],
#         authorAvatar=data["authorAvatar"],
#         steps=data["steps"],
#     )
#     db.session.add(new_recipe)
#     db.session.commit()
#     return jsonify(new_recipe.json())
  
@app.route("/recipes", methods=["POST"])
# @token_required
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
        # authorAvatar=data["authorAvatar"],
        steps=data["steps"],
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.json())


@app.route("/recipes/<int:id>", methods=["GET"])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404
    return jsonify(recipe.json())


@app.route("/recipes/<int:id>", methods=["PUT"])
# @token_required
def update_recipe(current_user, id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    if recipe.author != current_user.username:
        return (
            jsonify({"error": "You do not have permission to update this recipe."}),
            403,
        )

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


@app.route("/recipes/<int:id>", methods=["DELETE"])
# @token_required
def delete_recipe(current_user, id):
    recipe = Recipe.query.get(id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    if recipe.author != current_user.username:
        return (
            jsonify({"error": "You do not have permission to delete this recipe."}),
            403,
        )

    db.session.delete(recipe)
    db.session.commit()
    return jsonify(recipe.json())

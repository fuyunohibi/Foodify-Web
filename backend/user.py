from app import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from utils import apiResponse

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(150), nullable=False, unique=True)
    hashed_password = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        """Generate hashed password."""
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """Verify the provided password against the stored hash."""
        return check_password_hash(self.hashed_password, password)


db.create_all()

@app.route('/user/<int:id>', methods=['GET'])
def getUserByID(id):
    user = User.query.get(id)
    if user is None:
        return apiResponse({'error': 'user not found', 'status_code': 404})
    return apiResponse({'data': {
        'id': user.id,
        'user_name': user.user_name
    }})

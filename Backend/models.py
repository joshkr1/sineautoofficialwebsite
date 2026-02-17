from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Car(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50))
    model = db.Column(db.String(50))
    year = db.Column(db.Integer)
    price = db.Column(db.Numeric(10,2))
    mileage = db.Column(db.Integer)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    transmission = db.Column(db.String(50))
    fuel = db.Column(db.String(50))
    type = db.Column(db.String(50))
    color = db.Column(db.String(50))
    location = db.Column(db.String(50))
    status = db.Column(db.Enum('available','sold','pending'), default='available')
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Service(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    slug = db.Column(db.String(100), unique=True)
    description = db.Column(db.Text)
    short_description = db.Column(db.String(200))
    icon = db.Column(db.String(50))  # Font Awesome icon class
    features_left = db.Column(db.JSON)  # List of strings
    features_right = db.Column(db.JSON)
    left_title = db.Column(db.String(100))
    right_title = db.Column(db.String(100))
    button_text = db.Column(db.String(50))
    button_icon = db.Column(db.String(50))
    featured = db.Column(db.Boolean, default=False)

class CEO(db.Model):
    __tablename__ = 'ceo'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    title = db.Column(db.String(100))
    image_url = db.Column(db.String(255))
    bio_paragraphs = db.Column(db.JSON)  # List of strings
    quote = db.Column(db.Text)

class ContactInfo(db.Model):
    __tablename__ = 'contact_info'
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(50))
    email = db.Column(db.String(120))
    whatsapp = db.Column(db.String(120))
    address = db.Column(db.String(255))
    social_facebook = db.Column(db.String(255))
    social_twitter = db.Column(db.String(255))
    social_instagram = db.Column(db.String(255))
    social_linkedin = db.Column(db.String(255))
    social_youtube = db.Column(db.String(255))

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(50))
    service_interest = db.Column(db.String(100))
    message = db.Column(db.Text)
    form_type = db.Column(db.String(50))  # e.g., 'general', 'vehicle-sales'
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Inquiry(db.Model):
    __tablename__ = 'inquiries'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))  # vehicle-sales, luxury-sourcing, etc.
    data = db.Column(db.JSON)  # Store all form fields as JSON
    created_at = db.Column(db.DateTime, server_default=db.func.now())

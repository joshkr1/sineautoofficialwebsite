import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, Car, Service, CEO, ContactInfo, Message, Inquiry
from sqlalchemy import func

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)  # Enable CORS for development (remove in production if not needed)

# -------------------- API Routes --------------------

@app.route('/api/cars', methods=['GET'])
def get_cars():
    limit = request.args.get('limit', default=None, type=int)
    query = Car.query.filter_by(status='available')
    if limit:
        query = query.limit(limit)
    cars = query.all()
    return jsonify([{
        'id': c.id,
        'make': c.make,
        'model': c.model,
        'year': c.year,
        'price': float(c.price),
        'mileage': c.mileage,
        'description': c.description,
        'image_url': c.image_url,
        'transmission': c.transmission,
        'fuel': c.fuel,
        'type': c.type,
        'color': c.color,
        'location': c.location,
        'featured': c.featured
    } for c in cars])

@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    car = Car.query.get_or_404(car_id)
    return jsonify({
        'id': car.id,
        'make': car.make,
        'model': car.model,
        'year': car.year,
        'price': float(car.price),
        'mileage': car.mileage,
        'description': car.description,
        'image_url': car.image_url,
        'transmission': car.transmission,
        'fuel': car.fuel,
        'type': car.type,
        'color': car.color,
        'location': car.location,
        'status': car.status
    })

@app.route('/api/services', methods=['GET'])
def get_services():
    limit = request.args.get('limit', default=None, type=int)
    query = Service.query
    if limit:
        query = query.limit(limit)
    services = query.all()
    return jsonify([{
        'id': s.id,
        'title': s.title,
        'slug': s.slug,
        'description': s.description,
        'short_description': s.short_description,
        'icon': s.icon,
        'features_left': s.features_left,
        'features_right': s.features_right,
        'left_title': s.left_title,
        'right_title': s.right_title,
        'button_text': s.button_text,
        'button_icon': s.button_icon,
        'featured': s.featured
    } for s in services])

@app.route('/api/ceo', methods=['GET'])
def get_ceo():
    ceo = CEO.query.first()
    if not ceo:
        return jsonify({'error': 'CEO info not found'}), 404
    return jsonify({
        'name': ceo.name,
        'title': ceo.title,
        'image_url': ceo.image_url,
        'bio_paragraphs': ceo.bio_paragraphs,
        'quote': ceo.quote
    })

@app.route('/api/ceo/image', methods=['GET'])
def get_ceo_image():
    ceo = CEO.query.first()
    if not ceo:
        return jsonify({'error': 'CEO not found'}), 404
    return jsonify({'image_url': ceo.image_url})

@app.route('/api/contact', methods=['GET'])
def get_contact_info():
    contact = ContactInfo.query.first()
    if not contact:
        return jsonify({'error': 'Contact info not found'}), 404
    return jsonify({
        'phone': contact.phone,
        'email': contact.email,
        'whatsapp': contact.whatsapp,
        'address': contact.address,
        'social': {
            'facebook': contact.social_facebook,
            'twitter': contact.social_twitter,
            'instagram': contact.social_instagram,
            'linkedin': contact.social_linkedin,
            'youtube': contact.social_youtube
        }
    })

# Form submission endpoints
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    message = Message(
        name=data.get('fullName'),
        email=data.get('email'),
        phone=data.get('phone'),
        service_interest=data.get('serviceInterest'),
        message=data.get('message'),
        form_type=data.get('formType', 'general')
    )
    db.session.add(message)
    db.session.commit()
    return jsonify({'status': 'success', 'id': message.id})

@app.route('/api/sales-inquiries', methods=['POST'])
def submit_sales_inquiry():
    data = request.get_json()
    inquiry = Inquiry(type='vehicle-sales', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/shipping-quotes', methods=['POST'])
def submit_shipping_quote():
    data = request.get_json()
    inquiry = Inquiry(type='shipping-logistics', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/rentals', methods=['POST'])
def submit_rental():
    data = request.get_json()
    inquiry = Inquiry(type='car-rentals', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/luxury-sourcing', methods=['POST'])
def submit_luxury_sourcing():
    data = request.get_json()
    inquiry = Inquiry(type='luxury-sourcing', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/auctions', methods=['POST'])
def submit_auction():
    data = request.get_json()
    inquiry = Inquiry(type='auto-auctions', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/concierge', methods=['POST'])
def submit_concierge():
    data = request.get_json()
    inquiry = Inquiry(type='concierge-service', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

@app.route('/api/inspections', methods=['POST'])
def submit_inspection():
    data = request.get_json()
    inquiry = Inquiry(type='inspection', data=data)
    db.session.add(inquiry)
    db.session.commit()
    return jsonify({'status': 'success', 'id': inquiry.id})

# Health check
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

# -------------------- Admin routes (optional) --------------------
# You can add protected admin routes here using Flask-Login

if __name__ == '__main__':
    app.run(debug=True)

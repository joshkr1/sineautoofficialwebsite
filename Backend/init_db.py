from app import app
from models import db, Car, Service, CEO, ContactInfo

with app.app_context():
    # Create tables
    db.create_all()
    print("Tables created.")

    # Add sample CEO data if not exists
    if not CEO.query.first():
        ceo = CEO(
            name="Olaide Badmus",
            title="CEO & FOUNDER",
            image_url="/static/CEO.jpeg",
            bio_paragraphs=[
                "Economist & MBA (California, USA) with 20+ years in the automotive industry. Serial entrepreneur with a track record of growing multiple businesses. Currently a Senior Program Analyst in Manhattan, Olaide blends business expertise with a passion for cars. Leading Sine Autos to excellence in auto sales and service.",
                "With his unique blend of business acumen and automotive expertise, Olaide is poised to revolutionize the industry. Get ready to experience the best in auto sales and service!"
            ],
            quote="Excellence in automotive service isn't just about cars—it's about understanding people, building trust, and creating experiences that last a lifetime."
        )
        db.session.add(ceo)
        db.session.commit()
        print("CEO data seeded.")

    # Add sample contact info
    if not ContactInfo.query.first():
        contact = ContactInfo(
            phone="+1 (234) 567-890",
            email="info@sineautos.com",
            whatsapp="https://wa.me/1234567890",
            address="49, Ogba Road, Agege Lagos",
            social_facebook="https://facebook.com/sineautos",
            social_twitter="https://twitter.com/sineautos",
            social_instagram="https://instagram.com/sineautos",
            social_linkedin="https://linkedin.com/company/sineautos",
            social_youtube="https://youtube.com/sineautos"
        )
        db.session.add(contact)
        db.session.commit()
        print("Contact info seeded.")

    print("Database initialization complete.")

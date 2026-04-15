from app import app
from models import db, Car, Service, CEO, ContactInfo

with app.app_context():
    db.create_all()
    print("Tables created.")

    # CEO
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
        print("CEO seeded.")

    # Contact Info
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

    # Services
    if not Service.query.first():
        services = [
            Service(
                title="Vehicle Sales",
                slug="vehicle-sales",
                short_description="Buy or sell exceptional vehicles — from vintage classics to modern luxury.",
                description="Our vehicle sales service connects buyers and sellers across the globe. Whether you're looking for a rare vintage classic or the latest luxury model, our team curates an exceptional inventory.",
                icon="fa-car",
                features_left=["Verified vehicle history reports", "Professional pre-sale inspections", "Transparent pricing with no hidden fees", "Worldwide buyer network"],
                features_right=["Trade-in valuation services", "Flexible financing options", "Secure transaction handling", "Post-sale support"],
                left_title="For Buyers",
                right_title="For Sellers",
                button_text="Inquire About a Vehicle",
                button_icon="fa-envelope",
                featured=True
            ),
            Service(
                title="Luxury Sourcing",
                slug="luxury-sourcing",
                short_description="Bespoke sourcing of rare and exclusive vehicles from around the world.",
                description="Can't find the vehicle of your dreams? Our luxury sourcing team specializes in locating rare, limited-edition, and bespoke vehicles globally.",
                icon="fa-gem",
                features_left=["Global dealer and private seller network", "Rare and limited-edition vehicle access", "Confidential handling for high-profile clients", "Full authentication and provenance research"],
                features_right=["Factory-order facilitation", "Bespoke specification guidance", "Price negotiation on your behalf", "Discreet white-glove delivery"],
                left_title="Our Reach",
                right_title="Our Commitment",
                button_text="Start a Sourcing Request",
                button_icon="fa-search",
                featured=True
            ),
            Service(
                title="International Shipping",
                slug="shipping",
                short_description="Seamless vehicle transport and shipping to anywhere in the world.",
                description="We manage the complete logistics of transporting your vehicle internationally — from export documentation and customs clearance to insured shipping and delivery.",
                icon="fa-ship",
                features_left=["Door-to-door shipping coordination", "Export documentation and customs support", "Full insurance coverage during transit", "Real-time shipment tracking"],
                features_right=["RoRo and container shipping options", "Compliance with destination country regulations", "Specialized handling for classic and luxury vehicles", "Competitive freight rates"],
                left_title="Logistics",
                right_title="Compliance",
                button_text="Get a Shipping Quote",
                button_icon="fa-globe",
                featured=True
            ),
            Service(
                title="Luxury Rentals",
                slug="rentals",
                short_description="Experience world-class vehicles with our premium rental fleet.",
                description="Drive the vehicle you've always dreamed of. Our luxury rental fleet offers a curated selection of the world's finest automobiles for short-term and long-term hire.",
                icon="fa-key",
                features_left=["Curated fleet of luxury and exotic vehicles", "Flexible daily, weekly, and monthly rates", "Chauffeur-driven options available", "Corporate account packages"],
                features_right=["Comprehensive insurance included", "Delivery to your location", "24/7 roadside assistance", "Special event and wedding packages"],
                left_title="Fleet Options",
                right_title="Client Services",
                button_text="Book a Rental",
                button_icon="fa-calendar",
                featured=True
            ),
            Service(
                title="Auto Auctions",
                slug="auto-auctions",
                short_description="Access exclusive vehicle auctions and bid on exceptional inventory.",
                description="Participate in exclusive automotive auctions featuring rare, classic, and high-value vehicles. Our team guides you through the bidding process.",
                icon="fa-gavel",
                features_left=["Access to exclusive auction platforms", "Pre-auction vehicle inspection service", "Bidding representation and strategy", "Import/export handling for auction wins"],
                features_right=["Online and in-person auction access", "Post-auction financing options", "Title and documentation processing", "International auction access"],
                left_title="Auction Access",
                right_title="Post-Auction Support",
                button_text="Learn About Auctions",
                button_icon="fa-gavel",
                featured=False
            ),
            Service(
                title="Concierge Service",
                slug="concierge-service",
                short_description="A fully personalized automotive experience from start to finish.",
                description="Our concierge service offers a fully bespoke automotive experience — from initial consultation to final delivery. A dedicated specialist manages every aspect.",
                icon="fa-concierge-bell",
                features_left=["Dedicated personal automotive specialist", "End-to-end vehicle acquisition management", "VIP client handling and privacy", "Access to exclusive off-market inventory"],
                features_right=["Registration and plate coordination", "Storage and maintenance arrangements", "Fleet management for multiple vehicles", "Priority response and support"],
                left_title="Premium Access",
                right_title="Full Management",
                button_text="Request Concierge Service",
                button_icon="fa-star",
                featured=False
            ),
            Service(
                title="Vehicle Inspections",
                slug="inspections",
                short_description="Professional pre-purchase inspections and condition reports.",
                description="Before you commit to a purchase, our certified inspectors thoroughly evaluate any vehicle and provide a comprehensive condition report.",
                icon="fa-search",
                features_left=["Certified mechanical inspection", "Bodywork and paint assessment", "Interior condition evaluation", "Service history verification"],
                features_right=["Comprehensive written report with photos", "On-site or remote inspection coordination", "Independent third-party assessment", "Pre-export inspection compliance"],
                left_title="What We Check",
                right_title="What You Receive",
                button_text="Book an Inspection",
                button_icon="fa-clipboard-check",
                featured=False
            ),
        ]
        db.session.add_all(services)
        db.session.commit()
        print("Services seeded.")

    # Cars
    if not Car.query.first():
        cars = [
            Car(make="Rolls-Royce", model="Phantom", year=2023, price=450000, mileage=2100,
                description="The pinnacle of automotive luxury — Starlight Headliner, lambswool carpets, bespoke two-tone exterior.",
                image_url="https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
                transmission="Automatic", fuel="Petrol", type="Saloon", color="Andalusian White",
                location="London, UK", status="available", featured=True),
            Car(make="Bentley", model="Continental GT", year=2022, price=220000, mileage=8500,
                description="Grand tourer W12 in Beluga Black with Saddle interior — understated opulence.",
                image_url="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
                transmission="Automatic", fuel="Petrol", type="Coupe", color="Beluga Black",
                location="Dubai, UAE", status="available", featured=True),
            Car(make="Porsche", model="911 Turbo S", year=2023, price=230000, mileage=1200,
                description="Sport Chrono package, carbon ceramic brakes, Burmester surround sound.",
                image_url="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
                transmission="Automatic", fuel="Petrol", type="Coupe", color="GT Silver Metallic",
                location="Frankfurt, Germany", status="available", featured=True),
            Car(make="Ferrari", model="Roma", year=2022, price=270000, mileage=3800,
                description="La nuova Dolce Vita — elegant proportions and visceral performance.",
                image_url="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
                transmission="Automatic", fuel="Petrol", type="Coupe", color="Rosso Portofino",
                location="Milan, Italy", status="available", featured=True),
            Car(make="Mercedes-Benz", model="S-Class S580", year=2023, price=130000, mileage=5400,
                description="Executive rear seating package, 4D surround sound, full driver assistance.",
                image_url="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
                transmission="Automatic", fuel="Petrol", type="Saloon", color="Obsidian Black Metallic",
                location="Munich, Germany", status="available", featured=False),
            Car(make="Lamborghini", model="Urus Performante", year=2023, price=280000, mileage=900,
                description="The world's first super sport utility vehicle — most powerful Lamborghini SUV ever.",
                image_url="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
                transmission="Automatic", fuel="Petrol", type="SUV", color="Arancio Borealis",
                location="Riyadh, Saudi Arabia", status="available", featured=False),
        ]
        db.session.add_all(cars)
        db.session.commit()
        print("Cars seeded.")

    print("Database initialization complete.")

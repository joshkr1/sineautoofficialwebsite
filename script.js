// ===== CONFIGURATION =====
const API_BASE_URL = 'https://sineautoofficialwebsite-production.up.railway.app';

// ===== LOGO CLICK TO TOP =====
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== INITIALIZE DATE INPUTS =====
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
    });

    // ===== LOAD DYNAMIC DATA BASED ON PAGE =====
    const path = window.location.pathname;
    if (path.includes('index') || path === '/' || path.endsWith('/')) {
        if (typeof loadFeaturedCars === 'function') loadFeaturedCars();
        if (typeof loadFeaturedServices === 'function') loadFeaturedServices();
    } else if (path.includes('inventory')) {
        if (typeof loadCars === 'function') loadCars();
    } else if (path.includes('services')) {
        if (typeof loadServices === 'function') loadServices();
    } else if (path.includes('ceo')) {
        if (typeof loadCEOImage === 'function') loadCEOImage();
    }
});

// ===== MOBILE NAVIGATION =====
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// ===== SERVICE MODAL FORMS =====
const serviceForms = {
    'vehicle-sales': {
        title: 'Vehicle Sales Inquiry',
        fields: `
            <div class="modal-header">
                <h3>Vehicle Sales Inquiry</h3>
                <p class="modal-subtitle">Tell us about the vehicle you're interested in</p>
            </div>
            <form id="vehicleForm" onsubmit="submitForm(event, 'vehicle-sales')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <select name="brand" required>
                            <option value="">Preferred Brand</option>
                            <option>Mercedes-Benz</option>
                            <option>BMW</option>
                            <option>Audi</option>
                            <option>Porsche</option>
                            <option>Range Rover</option>
                            <option>Lexus</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="model" placeholder="Model Preference">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <select name="vehicleType" required>
                            <option value="">Vehicle Type</option>
                            <option>SUV</option>
                            <option>Sedan</option>
                            <option>Sports Car</option>
                            <option>Coupe</option>
                            <option>Classic/Vintage</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="budget" required>
                            <option value="">Budget Range</option>
                            <option>Under $30,000</option>
                            <option>$30,000 - $60,000</option>
                            <option>$60,000 - $100,000</option>
                            <option>$100,000 - $200,000</option>
                            <option>$200,000+</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <textarea name="message" placeholder="Additional requirements or notes..." rows="3"></textarea>
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-paper-plane"></i> Submit Inquiry
                </button>
            </form>
        `
    },
    'luxury-sourcing': {
        title: 'Luxury Vehicle Sourcing',
        fields: `
            <div class="modal-header">
                <h3>Luxury Vehicle Sourcing</h3>
                <p class="modal-subtitle">Let us find your dream luxury or exotic vehicle</p>
            </div>
            <form onsubmit="submitForm(event, 'luxury-sourcing')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <input type="text" name="vehicleModel" placeholder="Specific Make & Model (e.g., Ferrari SF90)" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="year" placeholder="Preferred Year">
                    </div>
                    <div class="form-group">
                        <select name="budget" required>
                            <option value="">Budget Range</option>
                            <option>$100,000 - $200,000</option>
                            <option>$200,000 - $500,000</option>
                            <option>$500,000 - $1,000,000</option>
                            <option>$1,000,000+</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <textarea name="requirements" placeholder="Specific requirements (color, trim, features, special requests)" rows="4" required></textarea>
                </div>
                <div class="form-note">
                    <i class="fas fa-info-circle"></i> Our global network specializes in locating rare and exotic vehicles. We'll contact you within 24 hours.
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-search-dollar"></i> Start Vehicle Search
                </button>
            </form>
        `
    },
    'shipping-logistics': {
        title: 'Shipping & Logistics Quote',
        fields: `
            <div class="modal-header">
                <h3>Shipping & Logistics Quote</h3>
                <p class="modal-subtitle">Get a customized quote for vehicle shipping</p>
            </div>
            <form onsubmit="submitForm(event, 'shipping-logistics')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="pickupLocation" placeholder="Pickup Location (City, Country)" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="deliveryLocation" placeholder="Delivery Location (City, Country)" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="vehicleMake" placeholder="Vehicle Make" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="vehicleModel" placeholder="Vehicle Model" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="vehicleYear" placeholder="Vehicle Year">
                    </div>
                    <div class="form-group">
                        <select name="vehicleCondition" required>
                            <option value="">Vehicle Condition</option>
                            <option>New</option>
                            <option>Used - Excellent</option>
                            <option>Used - Good</option>
                            <option>Classic/Vintage</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <textarea name="additionalNotes" placeholder="Additional notes (timeline, special handling requirements, etc.)" rows="3"></textarea>
                </div>
                <div class="form-note">
                    <i class="fas fa-info-circle"></i> A detailed quote will be sent to your email within 2 business hours. We handle all customs clearance and documentation.
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-shipping-fast"></i> Get Shipping Quote
                </button>
            </form>
        `
    },
    'auto-auctions': {
        title: 'Auto Auction Services',
        fields: `
            <div class="modal-header">
                <h3>Auto Auction Services</h3>
                <p class="modal-subtitle">Buy or sell vehicles through our auction network</p>
            </div>
            <form onsubmit="submitForm(event, 'auto-auctions')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <select name="serviceType" required>
                        <option value="">Service Type</option>
                        <option>I want to buy at auction</option>
                        <option>I want to sell at auction</option>
                        <option>I need auction representation</option>
                        <option>View upcoming auctions</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" name="vehicleOfInterest" placeholder="Vehicle of Interest (if buying)">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="sellingMake" placeholder="Vehicle Make (if selling)">
                    </div>
                    <div class="form-group">
                        <input type="text" name="sellingModel" placeholder="Vehicle Model (if selling)">
                    </div>
                </div>
                <div class="form-group">
                    <textarea name="details" placeholder="Tell us about your auction needs (budget, timeline, vehicle details, etc.)" rows="4" required></textarea>
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-gavel"></i> Request Auction Service
                </button>
            </form>
        `
    },
    'car-rentals': {
        title: 'Car Rental Request',
        fields: `
            <div class="modal-header">
                <h3>Car Rental Request</h3>
                <p class="modal-subtitle">Book luxury and executive vehicles</p>
            </div>
            <form onsubmit="submitForm(event, 'car-rentals')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="pickupLocation" placeholder="Pickup Location" required>
                    </div>
                    <div class="form-group">
                        <select name="duration" required>
                            <option value="">Rental Duration</option>
                            <option>Daily (1-3 days)</option>
                            <option>Weekly (4-7 days)</option>
                            <option>Monthly (1-3 months)</option>
                            <option>Long-term (3+ months)</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="date" name="startDate" required>
                    </div>
                    <div class="form-group">
                        <input type="date" name="endDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <select name="vehiclePreference" required>
                        <option value="">Vehicle Preference</option>
                        <option>Luxury Sedan (Mercedes S-Class, BMW 7 Series)</option>
                        <option>Premium SUV (Range Rover, Mercedes GLE)</option>
                        <option>Sports Car (Porsche 911, Audi R8)</option>
                        <option>Executive Vehicle with Driver</option>
                        <option>Not sure - Need recommendations</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="specialRequests" placeholder="Special requests (chauffeur, child seat, specific color, etc.)" rows="3"></textarea>
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-key"></i> Book Rental
                </button>
            </form>
        `
    },
    'concierge-service': {
        title: 'Concierge Service',
        fields: `
            <div class="modal-header">
                <h3>Concierge Service</h3>
                <p class="modal-subtitle">Your personal automotive experience from start to finish</p>
            </div>
            <form onsubmit="submitForm(event, 'concierge-service')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <select name="serviceType" required>
                        <option value="">Type of Service Needed</option>
                        <option>Full vehicle acquisition management</option>
                        <option>Fleet management</option>
                        <option>Registration & documentation</option>
                        <option>Storage & maintenance coordination</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="requirements" placeholder="Describe your requirements in detail..." rows="4" required></textarea>
                </div>
                <div class="form-note">
                    <i class="fas fa-star"></i> A dedicated specialist will be assigned to your account within 24 hours.
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-concierge-bell"></i> Request Concierge Service
                </button>
            </form>
        `
    },
    'general': {
        title: 'Contact Us',
        fields: `
            <div class="modal-header">
                <h3>Contact Us</h3>
                <p class="modal-subtitle">We'll get back to you within 24 hours</p>
            </div>
            <form onsubmit="submitForm(event, 'general')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number">
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <select name="serviceInterest">
                        <option value="">Service Interest (Optional)</option>
                        <option>Vehicle Sales</option>
                        <option>Luxury Sourcing</option>
                        <option>International Shipping</option>
                        <option>Car Rentals</option>
                        <option>Auto Auctions</option>
                        <option>Concierge Service</option>
                        <option>Vehicle Inspections</option>
                        <option>General Inquiry</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="message" placeholder="How can we help you?" rows="4" required></textarea>
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-paper-plane"></i> Send Message
                </button>
            </form>
        `
    }
};

// ===== OPEN SERVICE MODAL =====
function openServiceModal(serviceType, vehicleName = '') {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    if (serviceForms[serviceType]) {
        modalContent.innerHTML = serviceForms[serviceType].fields;

        // Pre-fill vehicle name if provided
        if (vehicleName) {
            const vehicleInput = modalContent.querySelector('[name="vehicleOfInterest"], [name="model"], [name="vehicleName"]');
            if (vehicleInput) vehicleInput.value = vehicleName;
        }

        // Set date minimums
        const today = new Date().toISOString().split('T')[0];
        modalContent.querySelectorAll('input[type="date"]').forEach(input => {
            input.min = today;
        });

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        openServiceModal('general');
    }
}

// ===== OPEN GENERAL / INSPECTION MODAL =====
function openModal(type, title) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    if (type === 'general') {
        openServiceModal('general');
        return;
    }

    if (type === 'inspection') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Book a Vehicle Inspection</h3>
                <p class="modal-subtitle">${title || 'Professional pre-purchase inspection'}</p>
            </div>
            <form onsubmit="submitForm(event, 'inspection')">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email Address">
                </div>
                <div class="form-group">
                    <input type="text" name="vehicleDetails" placeholder="Vehicle Details (Make, Model, Year, Location)" required value="${title ? title.replace('Inspection: ', '') : ''}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="date" name="preferredDate" required>
                    </div>
                    <div class="form-group">
                        <select name="preferredTime" required>
                            <option value="">Preferred Time</option>
                            <option>Morning (9 AM - 12 PM)</option>
                            <option>Afternoon (1 PM - 4 PM)</option>
                            <option>Evening (5 PM - 7 PM)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <textarea name="questions" placeholder="Any specific questions or requests for the inspection..." rows="3"></textarea>
                </div>
                <button class="btn btn-gold" type="submit" style="width: 100%;">
                    <i class="fas fa-calendar-check"></i> Schedule Inspection
                </button>
            </form>
        `;

        const today = new Date().toISOString().split('T')[0];
        modalContent.querySelectorAll('input[type="date"]').forEach(input => {
            input.min = today;
        });

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        openServiceModal('general');
    }
}

// ===== CLOSE MODAL =====
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// ===== FORM DATA HELPER =====
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    return data;
}

// ===== SUBMIT FORM TO API =====
async function submitFormToAPI(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error: error.message };
    }
}

// ===== SUBMIT FORM HANDLER =====
async function submitForm(event, formType) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = getFormData(form);
    formData.formType = formType;

    // Map form types to correct API endpoints
    let endpoint = '/api/contact';
    if (formType === 'inspection') {
        endpoint = '/api/inspections';
    } else if (formType === 'vehicle-sales') {
        endpoint = '/api/vehicle-sales';
    } else if (formType === 'shipping-logistics') {
        endpoint = '/api/shipping';
    } else if (formType === 'car-rentals') {
        endpoint = '/api/rentals';
    } else if (formType === 'luxury-sourcing') {
        endpoint = '/api/luxury-sourcing';
    } else if (formType === 'auto-auctions') {
        endpoint = '/api/auctions';
    } else if (formType === 'concierge-service') {
        endpoint = '/api/concierge';
    }

    const result = await submitFormToAPI(endpoint, formData);

    if (result.success) {
        let successMessage = `Thank you, ${formData.fullName || 'valued client'}! Your message has been received. We'll be in touch shortly.`;
        if (formType === 'shipping-logistics') {
            successMessage = `Thank you, ${formData.fullName}! Your shipping quote request has been submitted. A detailed quote will be sent to your email within 2 business hours.`;
        } else if (formType === 'car-rentals') {
            successMessage = `Thank you, ${formData.fullName}! Your rental request has been submitted. Our team will contact you within 2 hours to confirm availability and pricing.`;
        } else if (formType === 'luxury-sourcing') {
            successMessage = `Thank you, ${formData.fullName}! Your luxury vehicle search request has been submitted. Our sourcing specialists will contact you within 24 hours.`;
        } else if (formType === 'vehicle-sales') {
            successMessage = `Thank you, ${formData.fullName}! Your vehicle inquiry has been received. A member of our sales team will contact you shortly.`;
        } else if (formType === 'inspection') {
            successMessage = `Thank you! Your inspection has been scheduled. We'll confirm your appointment details by email.`;
        }
        alert(successMessage);
        closeModal();
    } else {
        alert('Sorry, there was an error submitting your request. Please try again or contact us directly at info@sineautos.com');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                const mobileNav = document.getElementById('mobileNav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        });
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

// ===== BACKEND DATA LOADING FUNCTIONS =====

// Load featured cars for homepage
async function loadFeaturedCars() {
    const container = document.getElementById('featured-cars-grid');
    if (!container) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars?limit=3`);
        const cars = await response.json();
        if (!cars.length) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No featured vehicles available.</p>';
            return;
        }
        let html = '';
        cars.forEach(car => {
            html += `
                <div class="card inventory-card" style="max-width: 320px;">
                    <img src="${car.image_url || 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800'}" alt="${car.make} ${car.model}">
                    <div class="inventory-content">
                        <h3>${car.year} ${car.make} ${car.model}</h3>
                        <div class="price">$${Number(car.price).toLocaleString()}</div>
                        <p>${car.transmission || 'Auto'} &bull; ${car.fuel || 'Petrol'} &bull; ${car.mileage?.toLocaleString() || '0'} miles</p>
                        <div class="actions">
                            <button class="btn btn-gold btn-sm" onclick="openServiceModal('vehicle-sales', '${car.year} ${car.make} ${car.model}')">
                                <i class="fab fa-whatsapp"></i> Inquiry
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="openModal('inspection', 'Inspection: ${car.year} ${car.make} ${car.model}')">
                                <i class="fas fa-calendar-check"></i> Inspect
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading featured cars:', error);
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Unable to load vehicles. Please try again later.</p>';
    }
}

// Load featured services for homepage
async function loadFeaturedServices() {
    const container = document.getElementById('featured-services-grid');
    if (!container) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/services?limit=3`);
        const services = await response.json();
        if (!services.length) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No services available.</p>';
            return;
        }
        let html = '';
        services.forEach(service => {
            html += `
                <div class="card service-card" onclick="window.location.href='services.html#${service.slug || service.id}'">
                    <div style="font-size: 40px; color: var(--gold); margin-bottom: 20px;">
                        <i class="fas ${service.icon || 'fa-car'}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p style="color: var(--muted);">${service.short_description || ''}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading featured services:', error);
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Unable to load services.</p>';
    }
}

// Load CEO image (used in ceo.html)
async function loadCEOImage() {
    const ceoImage = document.getElementById('ceo-image');
    if (!ceoImage) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/ceo/image`);
        const data = await response.json();
        if (data.image_url) ceoImage.src = data.image_url;
    } catch (error) {
        console.error('Error loading CEO image:', error);
    }
}

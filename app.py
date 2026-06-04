from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

def send_contact_email(name, email, phone, message):
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')
    contact_email = os.environ.get('CONTACT_EMAIL', 'ndebouod@gmail.com')

    if not smtp_user or not smtp_pass:
        print(f'[Contact] New inquiry (email not configured) — from: {name} <{email}>, phone: {phone}, message: {message}')
        return

    msg = MIMEMultipart()
    msg['Subject'] = f'New inquiry from {name}'
    msg['From'] = smtp_user
    msg['To'] = contact_email
    msg['Reply-To'] = email

    body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.errorhandler(404)
def not_found(e):
    if request.path.startswith('/api/'):
        return jsonify({'error': 'Not found'}), 404
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    if request.path.startswith('/api/'):
        return jsonify({'error': 'Internal server error'}), 500
    return render_template('500.html'), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')

        if not all([name, email, phone, message]):
            return jsonify({'error': 'All fields are required'}), 400

        send_contact_email(name, email, phone, message)
        return jsonify({
            'success': True,
            'message': 'Thank you for your inquiry. We will contact you soon.'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

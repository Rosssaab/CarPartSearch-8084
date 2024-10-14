from flask import Flask, render_template, request, url_for
import requests
import os
from dotenv import load_dotenv
import waitress
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__, static_url_path='/static')

# Get the DVLA API key from environment variables
DVLA_API_KEY = os.getenv('DVLA_API_KEY')
DVLA_API_URL = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles'

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug(f"DVLA_API_KEY: {DVLA_API_KEY[:5]}...")

# Define theme options
THEME_OPTIONS = [
    ('default', 'Default'),
    ('cyborg', 'Cyborg'),
    ('darkly', 'Darkly'),
    ('lumen', 'Lumen'),
    ('minty', 'Minty'),
    ('pulse', 'Pulse'),
    ('sandstone', 'Sandstone'),
    ('solar', 'Solar')
]

def get_car_details(reg_number):
    headers = {
        'x-api-key': DVLA_API_KEY,
        'Content-Type': 'application/json'
    }
    payload = {
        'registrationNumber': reg_number
    }

    try:
        logger.debug(f"Sending request to DVLA API: URL={DVLA_API_URL}, payload={payload}")
        response = requests.post(DVLA_API_URL, json=payload, headers=headers)
        logger.debug(f"Response status code: {response.status_code}")
        logger.debug(f"Response content: {response.text}")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching car details: {e}")
        raise

@app.route('/', methods=['GET', 'POST'])
def index():
    car_details = None
    error = None
    reg_number = None
    theme = request.args.get('theme', 'default')  # Default theme is 'default'

    if request.method == 'POST':
        if 'search_car' in request.form:
            try:
                reg_number = request.form.get('reg_number', '').upper()
                logger.debug(f"Received registration number: {reg_number}")
                car_details = get_car_details(reg_number)
            except Exception as e:
                logger.exception(f"An error occurred during car lookup: {str(e)}")
                error = f"An error occurred during car lookup: {str(e)}"

    return render_template('index.html', car_details=car_details, error=error, theme=theme, theme_options=THEME_OPTIONS, reg_number=reg_number)

@app.route('/<theme>')
def themed_index(theme):
    return index()

if __name__ == '__main__':
    from waitress import serve
    print("Starting server on http://localhost:8084")
    serve(app, host='0.0.0.0', port=8084)

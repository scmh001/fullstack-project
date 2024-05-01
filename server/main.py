from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)
CORS(app, origins='*')

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify({"users": ['shukri', 'jasen', 'michael', 'kristen']})

GOOGLE_MAPS_API_KEY = ''

def get_coordinates(address):
    """Get the latitude and longitude coordinates for an address using Google Geocoding API"""
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GOOGLE_MAPS_API_KEY}'
    response = requests.get(url)
    data = response.json()
    if data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    return None, None

def get_midpoint(lat1, lng1, lat2, lng2):
    """Calculate the midpoint between two coordinates"""
    midpoint_lat = (lat1 + lat2) / 2
    midpoint_lng = (lng1 + lng2) / 2
    return midpoint_lat, midpoint_lng

def get_nearby_restaurants(lat, lng):
    """Get nearby restaurants using Google Places API"""
    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=1000&type=restaurant&key={GOOGLE_MAPS_API_KEY}'
    response = requests.get(url)
    data = response.json()
    restaurants = data['results']
    return restaurants

@app.route('/api/midpoint', methods=['POST'])
def find_midpoint():
    data = request.get_json()
    address1 = data['address1']
    address2 = data['address2']
    lat1, lng1 = get_coordinates(address1)
    lat2, lng2 = get_coordinates(address2)
    if lat1 and lng1 and lat2 and lng2:
        midpoint_lat, midpoint_lng = get_midpoint(lat1, lng1, lat2, lng2)
        restaurants = get_nearby_restaurants(midpoint_lat, midpoint_lng)
        return jsonify({'midpoint': [midpoint_lat, midpoint_lng], 'restaurants': restaurants})
    else:
        return jsonify({'error': 'Invalid addresses'}), 400

if __name__ == "__main__":
    app.run(debug=True, port=8080)
from flask import Flask, jsonify, request
import requests
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)

@app.route('/suggest-places')
def suggest_places():
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')

        if not lat or not lng:
            return jsonify({'error': 'Latitude and longitude are required'}), 400

        # Make a request to Google Places API to fetch nearby bars and restaurants
        response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params={
            'location': f'{lat},{lng}',
            'radius': 5000,  # Radius in meters (need to adjust)
            'type': 'restaurant|bar',  # (placeholder example)
            'key': 'API_KEY_HERE',  # put real key later
        })

        data = response.json()
        places = []
        for place in data['results']:
            places.append({
                'name': place['name'],
                'vicinity': place['vicinity'],
                'rating': place.get('rating', 'N/A'), #if we want this
                'distance': calculate_distance(float(lat), float(lng), place['geometry']['location']['lat'], place['geometry']['location']['lng'])
            })

        # Sort places by distance
        places.sort(key=lambda x: x['distance'])

        # Calculate median distance
        median_distance = calculate_median_distance([place['distance'] for place in places])

        return jsonify({'places': places, 'median_distance': median_distance}), 200

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal server error'}), 500


def calculate_distances(start_lats, start_lngs, dest_lat, dest_lng):
    # Convert latitude and longitude from degrees to radians
    start_lats = [radians(lat) for lat in start_lats]
    start_lngs = [radians(lng) for lng in start_lngs]
    dest_lat = radians(dest_lat)
    dest_lng = radians(dest_lng)

    distances = []
    for start_lat, start_lng in zip(start_lats, start_lngs):
        #zip is a built in python function that takes iterables(lists,tuples,strings etc) as arguments and returns an iterator that
        #returns an iterator and generates tuples by aggregating elements from each iterable
        # Haversine formula - the formula used to calculate distances between points on Earth's surface given lat and long coords
        dlat = dest_lat - start_lat
        dlng = dest_lng - start_lng
        a = sin(dlat / 2)**2 + cos(start_lat) * cos(dest_lat) * sin(dlng / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = 6371e3 * c  # Radius of the Earth in meters
        distances.append(distance)

    return distances

def calculate_median_distance(distances):
    sorted_distances = sorted(distances)
    n = len(sorted_distances)
    
    if n % 2 == 0:
        # If the number of distances is even, take the average of the middle two distances
        median_distance = (sorted_distances[n // 2 - 1] + sorted_distances[n // 2]) / 2
    else:
        # If the number of distances is odd, take the middle distance
        median_distance = sorted_distances[n // 2]
    
    return median_distance

    ...

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="voting_db"
)
cursor = db.cursor(dictionary=True)

# ----------------------
# Sign In (Demo)
# ----------------------
@app.route('/signin', methods=['POST'])
def signin():
    email = request.json.get('email')
    password = request.json.get('password')

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Sign In successful", "user_id": user['id']})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# ----------------------
# Voting Registration
# ----------------------
@app.route('/register_voter', methods=['POST'])
def register_voter():
    data = request.json
    name = data.get('name')
    voter_id = data.get('voter_id')
    age = data.get('age')
    address = data.get('address')

    # Validate all fields
    if not all([name, voter_id, age, address]):
        return jsonify({"message": "All fields are required"}), 400
    if int(age) < 18:
        return jsonify({"message": "You must be at least 18 to register"}), 400

    # Check if voter already exists
    cursor.execute("SELECT * FROM voters WHERE voter_id=%s", (voter_id,))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"message": "Voter already registered"}), 400

    # Register voter
    cursor.execute("INSERT INTO voters (name, voter_id, age, address) VALUES (%s,%s,%s,%s)", 
                   (name, voter_id, age, address))
    db.commit()
    return jsonify({"message": "Voter registration successful!"})

if __name__ == '__main__':
    app.run(debug=True)

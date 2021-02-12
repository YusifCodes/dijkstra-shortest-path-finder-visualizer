import flask
from flask import request, jsonify
import mysql.connector
from web_crawler import update_db
from web_crawler import select_from_db

app = flask.Flask(__name__)
app.config["DEBUG"] = True

#get current time for testing needs

@app.route('/news', methods=['GET'])
def return_data():
    container = select_from_db()
    return jsonify(container)

@app.route('/news/fresh', methods=["GET"])
def update_data():
    update_db()
    container = select_from_db()
    return jsonify(container)
    


app.run()

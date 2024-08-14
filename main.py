﻿#main.py

from flask import Flask  
from flask import render_template

app = Flask(__name__)

@app.route("/")
def hello():  
    return render_template('index.html')

@app.route("/login")
def login():
   return render_template('login.html')


if __name__ == "__main__":
  # debugging 
  app.run(debug=True)
  
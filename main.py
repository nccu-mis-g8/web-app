﻿#main.py

from flask import Flask  
from flask import render_template
from upload import upload_bp

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = r'C:\Users\user\Downloads\upload_files'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

app.register_blueprint(upload_bp, url_prefix='/upload')

@app.route("/")
def hello():  
    return render_template('index.html')


if __name__ == "__main__":
  # debugging 
  app.run(debug=True)
  
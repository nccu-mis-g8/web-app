from flaskwebgui import FlaskUI # import FlaskUI
from main import app

if __name__ == "__main__":
  FlaskUI(app=app, server="flask").run()
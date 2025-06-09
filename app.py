from flask import Flask, render_template, jsonify, flash
from api_service import get_stream_data


app = Flask(__name__)


@app.route('/')
def index():
    """Main dashboard page."""
    try:
        stream_data = get_stream_data()

        return render_template('dashboards/main.html',
                               stream_data=stream_data,
                               )
    except Exception as e:
        flash(f"Error loading data: {str(e)}", "danger")
        return render_template('dashboards/main.html',
                               stream_data=[])






if __name__ == '__main__':
    app.run(debug=True)
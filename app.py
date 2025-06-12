from flask import Flask, render_template, jsonify, flash,request
from api_service import get_stream_data,get_stream_data_dummy


app = Flask(__name__)

@app.route('/')
def table():
    """Main dashboard page."""
    try:
        # stream_data = get_stream_data()
        stream_data = get_stream_data()
        return render_template('index.html',
                               stream_data=stream_data,
                               )
    except Exception as e:
        flash(f"Error loading data: {str(e)}", "danger")
        return render_template('errors/404.html',
                               stream_data=[])

@app.route('/get_data')
def get_data():
    """API endpoint to get data via AJAX."""
    try:
        # stream_data = get_stream_data()
        stream_data = get_stream_data_dummy()
        return jsonify(stream_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run()
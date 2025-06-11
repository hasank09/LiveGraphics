from flask import Flask, render_template, jsonify, flash,request
from api_service import get_stream_data,get_stream_data_dummy


app = Flask(__name__)


@app.route('/')
def table():
    """Main dashboard page."""
    try:
        # stream_data = get_stream_data()
        stream_data = get_stream_data_dummy()
        return render_template('index.html',
                               stream_data=stream_data,
                               )
    except Exception as e:
        flash(f"Error loading data: {str(e)}", "danger")
        return render_template('errors/404.html',
                               stream_data=[])






if __name__ == '__main__':
    app.run()
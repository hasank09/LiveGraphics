from flask import Flask, render_template, jsonify, flash,request
from api_service import get_stream_data,get_stream_data_dummy


app = Flask(__name__)


@app.route('/')
def home():
    """Home page with table format selection."""
    return render_template('home.html')


@app.route('/view-table')
def view_table():
    """Display selected table format with rider data."""
    format_id = request.args.get('format', '1')

    # Map format ID to template path
    format_templates = {
        '1': 'tables/table1.html',
        '2': 'tables/table2.html',
        '3': 'tables/table3.html'
    }

    template_path = format_templates.get(format_id, format_templates['1'])

    # Include any additional settings based on format
    dark_mode = (format_id == '3')

    return render_template(
        'table_view.html',
        stream_data=get_stream_data_dummy(),
        table_template=template_path,
        format_id=format_id,
        dark_mode=dark_mode
    )


@app.route('/api/rider-data')
def rider_data_api():
    """API endpoint to get rider data for AJAX refreshing."""
    # In a real app, you would fetch the latest data here
    return {'data': get_stream_data()}


@app.route('/table')
def table():
    """Main dashboard page."""
    try:
        # stream_data = get_stream_data()
        stream_data = get_stream_data_dummy()
        return render_template('dashboards/main.html',
                               stream_data=stream_data,
                               )
    except Exception as e:
        flash(f"Error loading data: {str(e)}", "danger")
        return render_template('dashboards/main.html',
                               stream_data=[])






if __name__ == '__main__':
    app.run(debug=True)
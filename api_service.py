import requests
import json
import random
import pprint


def get_stream_data():
    """
    Fetch team performance data from the API.

    Returns:
        list: List of Rider data

    Raises:
        Exception: If API request fails
    """

    try:
        # For demo purposes, use sample data instead of actual API call
        stream_api = 'https://api.npoint.io/82483fea5af8196f51a4'

        response = requests.get(stream_api)
        data = response.json()
        selected_data = random.choices(data, k=5)

        # print('Total Data Size:', len(data))
        # print('Selected Data Size:', len(selected_data))
        # pprint.pprint(selected_data)
        return selected_data
    except Exception as e:
        raise Exception(f"Error fetching team data: {str(e)}")

def get_stream_data_dummy():
    try:
        # For demo, use sample data instead of actual API call
        data = open('api_data_generation/data.json').read()
        data = json.loads(data)
        selected_data = random.choices(data, k=5)

        print('Total Data Size:', len(data))
        print('Selected Data Size:', len(selected_data))
        pprint.pprint(selected_data)
        return selected_data
    except Exception as e:
        raise Exception(f"Error fetching team data: {str(e)}")


if __name__ == '__main__':
    get_stream_data_dummy()

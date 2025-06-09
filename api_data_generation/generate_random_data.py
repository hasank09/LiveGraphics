import requests
import random
import pprint

stream_api = 'https://api.npoint.io/82483fea5af8196f51a4'

response = requests.get(stream_api)
data = response.json()
selected_data = random.choices(data, k=10)

print('Total Data Size:',len(data))
print('Selected Data Size:',len(selected_data))
pprint.pprint(selected_data)

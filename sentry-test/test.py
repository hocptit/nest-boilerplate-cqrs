import requests

headers = {'Authorization': 'DSN https://23dbd4e6516f416184fe9927971187f8@o4504815190867968.ingest.sentry.io/4504818264375296'}
monitor_id = '3e2e9cef-a5e1-44d8-afcd-2c453bab2522' # Write your monitor_id here
org_slug = 'sotatek-backend' # Write your organization slug here

# Create the check-in
json_data = {'status': 'in_progress'}
requests.post(f'https://sentry.io/api/0/organizations/{org_slug}/monitors/{monitor_id}/checkins/', headers=headers, json=json_data)

# Execute your scheduled task code here...

# Update the check-in status (required) and duration (optional)
json_data = {'status': 'ok', 'duration': 3000}
requests.put(f'https://sentry.io/api/0/organizations/{org_slug}/monitors/{monitor_id}/checkins/latest/', headers=headers, json=json_data)
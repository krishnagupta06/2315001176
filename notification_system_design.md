# Notification System Design

## Objective

The notification system is designed to send important alerts and reminders to users.

## Components

1. Client Application
2. Backend API Server
3. Database
4. Notification Service
5. Email/SMS/Push Provider

## Flow

1. User creates an event or reminder.
2. Backend API stores the data.
3. Notification service checks pending notifications.
4. Notification is sent to the user.
5. Status is updated as Sent.

## API Design

### Create Notification

POST /notifications

Request Body:
{
  "title": "Service Reminder",
  "message": "Your vehicle service is due tomorrow",
  "type": "Email"
}

### Get Notifications

GET /notifications

### Send Notification

PUT /notifications/:id/send

### Delete Notification

DELETE /notifications/:id

## Database Tables

### Notifications

| Field | Type |
|---|---|
| id | Number |
| title | String |
| message | String |
| type | String |
| status | String |
| createdAt | Date |

## Error Handling

- 400 Bad Request for missing data
- 404 Not Found if notification does not exist
- 500 Internal Server Error for server issues

## Logging

All API requests will pass through custom logging middleware.

The logger stores:
- Timestamp
- HTTP Method
- API URL
- Status Code
- Response Time

## Authentication

As per evaluation instructions, users are considered pre-authorised. No login or registration system is required.
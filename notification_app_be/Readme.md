# Notification App Backend

## APIs

### GET /
Check API status.

### GET /notifications
Get all notifications.

### POST /notifications
Create notification.

Body:
{
  "title": "Service Reminder",
  "message": "Your vehicle service is due tomorrow",
  "type": "Email"
}

### PUT /notifications/:id/send
Mark notification as sent.

### DELETE /notifications/:id
Delete notification.
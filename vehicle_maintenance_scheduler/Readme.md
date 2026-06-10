# Vehicle Maintenance Scheduler

## APIs

### GET /
Check API status.

### GET /vehicles
Get all vehicles.

### GET /vehicles/:id
Get vehicle by ID.

### POST /vehicles
Create vehicle service schedule.

Body:
{
  "vehicleName": "Scorpio",
  "ownerName": "Krishna",
  "serviceDate": "2026-06-15",
  "status": "Pending"
}

### PUT /vehicles/:id
Update vehicle details.

### DELETE /vehicles/:id
Delete vehicle schedule.
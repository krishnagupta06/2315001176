const express = require("express");
const logger = require("../logging_middleware/logger.js");

const app = express();

app.use(express.json());
app.use(logger);

let notifications = [
  {
    id: 1,
    title: "Service Reminder",
    message: "Your vehicle service is due tomorrow",
    type: "Email",
    status: "Pending"
  }
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Notification App Backend is working"
  });
});

app.get("/notifications", (req, res) => {
  res.status(200).json({
    success: true,
    data: notifications
  });
});

app.post("/notifications", (req, res) => {
  const { title, message, type } = req.body;

  if (!title || !message || !type) {
    return res.status(400).json({
      success: false,
      message: "title, message and type are required"
    });
  }

  const notification = {
    id: notifications.length + 1,
    title,
    message,
    type,
    status: "Pending"
  };

  notifications.push(notification);

  res.status(201).json({
    success: true,
    message: "Notification created successfully",
    data: notification
  });
});

app.put("/notifications/:id/send", (req, res) => {
  const id = Number(req.params.id);

  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found"
    });
  }

  notification.status = "Sent";

  res.status(200).json({
    success: true,
    message: "Notification sent successfully",
    data: notification
  });
});

app.delete("/notifications/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Notification not found"
    });
  }

  notifications.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully"
  });
});

app.listen(4000);
const express = require("express");
const logger = require("../logging_middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

let vehicles = [
  {
    id: 1,
    vehicleName: "Scorpio",
    ownerName: "Krishna",
    serviceDate: "2026-06-15",
    status: "Pending"
  }
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Vehicle Maintenance Scheduler API is working"
  });
});

app.get("/vehicles", (req, res) => {
  res.status(200).json({
    success: true,
    data: vehicles
  });
});

app.get("/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
  }

  res.status(200).json({
    success: true,
    data: vehicle
  });
});

app.post("/vehicles", (req, res) => {
  const { vehicleName, ownerName, serviceDate, status } = req.body;

  if (!vehicleName || !ownerName || !serviceDate) {
    return res.status(400).json({
      success: false,
      message: "vehicleName, ownerName and serviceDate are required"
    });
  }

  const newVehicle = {
    id: vehicles.length + 1,
    vehicleName,
    ownerName,
    serviceDate,
    status: status || "Pending"
  };

  vehicles.push(newVehicle);

  res.status(201).json({
    success: true,
    message: "Vehicle service scheduled successfully",
    data: newVehicle
  });
});

app.put("/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
  }

  const { vehicleName, ownerName, serviceDate, status } = req.body;

  vehicle.vehicleName = vehicleName || vehicle.vehicleName;
  vehicle.ownerName = ownerName || vehicle.ownerName;
  vehicle.serviceDate = serviceDate || vehicle.serviceDate;
  vehicle.status = status || vehicle.status;

  res.status(200).json({
    success: true,
    message: "Vehicle updated successfully",
    data: vehicle
  });
});

app.delete("/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = vehicles.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found"
    });
  }

  vehicles.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully"
  });
});

app.listen(3000);
const fs = require("fs");
const path = require("path");

function logger(req, res, next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${duration}ms`
    };

    const logMessage = JSON.stringify(logData) + "\n";

    const logFilePath = path.join(__dirname, "logs.txt");

    fs.appendFileSync(logFilePath, logMessage);
  });

  next();
}

module.exports = logger;
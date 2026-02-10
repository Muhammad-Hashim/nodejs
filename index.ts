import express from "express";

const app = express();

// Simple health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Server is running",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
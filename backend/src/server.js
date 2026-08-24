require("dotenv").config();

const express = require("express");
const cors = require("cors");

const emergencyRoutes = require("./routes/emergency.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({
    limit: "100kb"
    }));

    app.get("/health", (req, res) => {
        res.json({
                success: true,
                        service: "Emergency Backend",
                                status: "healthy"
                                    });
                                    });

                                    app.use("/api/emergency", emergencyRoutes);

                                    app.use(errorHandler);

                                    app.listen(PORT, () => {
                                        console.log(`🚀 Backend running on port ${PORT}`);
                                        });
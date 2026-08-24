function errorHandler(err, req, res, next) {
    console.error("========== BACKEND ERROR ==========");
    console.error(err);
    if (err && err.stack) {
        console.error(err.stack);
    }
    console.error("===================================");

    res.status(500).json({
        success: false,
        error: err.message || "Unable to process emergency request"
    });
}

module.exports = errorHandler;

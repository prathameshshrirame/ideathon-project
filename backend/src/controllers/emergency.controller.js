const { analyzeEmergency } = require("../services/gemini.service");

async function analyze(req, res, next) {

    try {

            const { emergency } = req.body;

                    if (!emergency || typeof emergency !== "string") {
                                return res.status(400).json({
                                                success: false,
                                                                error: "Emergency description is required"
                                                                            });
                                                                                    }

                                                                                            if (emergency.trim().length < 5) {
                                                                                                        return res.status(400).json({
                                                                                                                        success: false,
                                                                                                                                        error: "Emergency description is too short"
                                                                                                                                                    });
                                                                                                                                                            }

                                                                                                                                                                    const result = await analyzeEmergency(
                                                                                                                                                                                emergency.trim()
                                                                                                                                                                                        );

                                                                                                                                                                                                res.status(200).json({
                                                                                                                                                                                                            success: true,
                                                                                                                                                                                                                        data: {
                                                                                                                                                                                                                                        emergency: emergency.trim(),
                                                                                                                                                                                                                                                        result
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                } catch (error) {

                                                                                                                                                                                                                                                                                        next(error);

                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                            module.exports = {
                                                                                                                                                                                                                                                                                                analyze
                                                                                                                                                                                                                                                                                                };
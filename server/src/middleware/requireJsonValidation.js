const requireJson = (req, res, next) => {
    const methods = ["POST", "PUT", "PATCH"];

    if (
        methods.includes(req.method) &&
        !req.is("application/json")
    ) {
        return res.status(415).json({
            success: false,
            message: "Content-Type must be application/json"
        });
    }

    next();
};

export default requireJson;
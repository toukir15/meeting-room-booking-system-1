"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        var _a, _b;
        let parsedData;
        try {
            // Try parsing req.body.data as JSON if it's a string, otherwise fallback to req.body
            if (typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === 'string') {
                parsedData = JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.data);
            }
            else {
                parsedData = req.body;
            }
            // Check if parsedData is an array and validate each item
            if (Array.isArray(parsedData)) {
                parsedData.forEach((data) => {
                    schema.parse({ body: data });
                });
            }
            else {
                schema.parse({ body: parsedData });
            }
            next();
        }
        catch (err) {
            // Handle validation errors explicitly
            next(err);
        }
    };
};
exports.validateRequest = validateRequest;

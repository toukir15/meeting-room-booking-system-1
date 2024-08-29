"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            if (Array.isArray(req.body)) {
                req.body.forEach((data) => {
                    schema.parse({ body: data });
                });
            }
            else {
                schema.parse({ body: req.body });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.validateRequest = validateRequest;

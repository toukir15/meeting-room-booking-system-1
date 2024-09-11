"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        var _a, _b;
        let parsedData;
        try {
            if (typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === 'string') {
                parsedData = JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.data);
            }
            else {
                parsedData = req.body;
            }
            schema.parse({ body: parsedData });
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.validateRequest = validateRequest;

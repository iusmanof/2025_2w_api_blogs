"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array().map(err => ({
            message: err.msg,
            field: err.path
        }));
        res.status(400).send({ errorsMessages: errorsArray });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;

import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

const formValidation: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array({ onlyFirstError: true });
        res.status(422).json({
            message: extractedErrors[0]?.msg || "Validation failed",
            errors: extractedErrors
        });
        return
    }
    next();
}


export default formValidation
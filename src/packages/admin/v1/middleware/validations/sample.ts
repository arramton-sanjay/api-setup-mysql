import { check } from "express-validator/lib";
import formValidation from "../others";


export const  validations = {
    userCords: [
        check("lat")
            .trim()
            .notEmpty().withMessage("Please choose a latitude number."),
        check("long")
            .trim()
            .notEmpty().withMessage("Please choose a longitude number."),

        formValidation
    ],
}
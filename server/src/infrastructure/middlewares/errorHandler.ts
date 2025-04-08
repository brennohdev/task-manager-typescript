import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http";

export const errorHandler:ErrorRequestHandler = (
    error, 
    req, 
    res, 
    next
):any => {
    console.error(`Error Occured on PATH: ${req.path}`, error);
    
    if (error instanceof SyntaxError) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid JSON format. Please check your request body.",
        }
    )};

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error?.message || "Unknown error occurred",
    });
};
import { Request, Response, NextFunction } from 'express'

interface TRequest extends Request {
    userName?: string; 
}

type TResponse = Response
type TNextFunction = NextFunction

export {
    TRequest,
    TResponse,
    TNextFunction,
}
import express, { Router, Express } from 'express'

export default class routerInstance {
    constructor(){
    }

    Servidor():Express {
        return express() 
    }

    Router():Router {
        return Router()
    }
}
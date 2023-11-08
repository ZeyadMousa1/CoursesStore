import { Request, Response } from "express"

const notFound = (req: Request, res: Response) => {
    res.json({
        message: "Route Not Found"
    })
}

export {notFound}
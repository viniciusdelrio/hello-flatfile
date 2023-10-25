import { Router, Request, Response } from "express";
import * as controller from "../controllers/clients"

const clientsRouter = Router()

clientsRouter.get('/', async (req: Request, res: Response) => {
    const clients = await controller.getAllClients()
    return res.status(200).send(clients)
})

clientsRouter.get('/:clientId/space', async (req: Request, res: Response) => {
    const space = await controller.getClientSpace(req.params.clientId)
    return res.status(200).send(space)
})

clientsRouter.post('/:clientId/space', async (req: Request, res: Response) => {
    const space = await controller.createClientSpace(req.params.clientId)
    return res.status(200).send(space)
})

export default clientsRouter;
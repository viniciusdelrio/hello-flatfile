import { InferCreationAttributes, Op } from "sequelize";
import ClientSpace from "../models/ClientSpace";

export const findByClient = async (clientId: string): Promise<ClientSpace | null> => {
    const clientSpace = await ClientSpace.findByPk(clientId)
    return clientSpace
}

export const findByClientOrSpace = async (clientId: string, spaceId: string): Promise<ClientSpace | null> => {
    const clientSpace = await ClientSpace.findOne({
        where: {
            [Op.or]: [{clientId}, {spaceId}]
        }
    })

    return clientSpace
}

export const create = async (clientSpace: InferCreationAttributes<ClientSpace>): Promise<ClientSpace> =>
    ClientSpace.create(clientSpace)
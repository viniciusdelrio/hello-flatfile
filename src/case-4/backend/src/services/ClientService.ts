import { ValidationError } from '../common/errors/ValidationError'
import ClientSpace from '../db/models/ClientSpace'
import * as repository from '../db/repositories/ClientRepository'
import * as flatfileService from './FlatfileService'

export const getAll = () => {
    return repository.getAll()
}

export const getClientSpace = async (clientId: string) => {
    const clientSpace = await repository.getClientSpaceByClientId(clientId)

    if (!clientSpace) return {};

    const space = await flatfileService.getSpaceById(clientSpace.spaceId)

    return {
        id: space.id,
        accessToken: space.accessToken
    }
}

export const createClientSpace = async (clientId: string) => {
    const clientSpace = await repository.getClientSpaceByClientId(clientId)

    if (clientSpace)
        throw new ValidationError('There is a space for this client already!')

    const client = repository.getClientById(clientId)

    if (!client)
        throw 'Ooops. Some bad thing happens!'

    const space = await flatfileService.createSpaceWithWorkbook(client.name)

    await ClientSpace.create({
        clientId,
        spaceId: space.id
    })

    return {
        id: space.id,
        accessToken: space.accessToken
    }
}
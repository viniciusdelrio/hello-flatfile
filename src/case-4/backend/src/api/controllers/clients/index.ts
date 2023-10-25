import * as clientService from '../../../services/ClientService'

export const getAllClients = () => {
    return clientService.getAll()
}

export const getClientSpace = async (clientId: string) => {
    return await clientService.getClientSpace(clientId)
}

export const createClientSpace = async (clientId: string) => {
    return await clientService.createClientSpace(clientId)
}
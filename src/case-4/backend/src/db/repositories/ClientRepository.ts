import ClientSpace from "../models/ClientSpace";

const clients = [
    {
        id: "3c7d2870-e1be-4344-862f-832e46f9e513",
        name: "PhakeCompany"
    },
    {
        id: "9e0d1bcb-2c2c-42ff-b995-1dc6967c3f94",
        name: "H3lloW0rd IT"
    }
];

export const getAll = () => {
    return clients
}

export const getClientById = (clientId: string) => {
    return clients.find(c => c.id === clientId)
}

export const getClientSpaceByClientId = async (clientId: string): Promise<ClientSpace | null> => {
    const clientSpace = await ClientSpace.findOne({
        where: {
            clientId
        }
    })

    return clientSpace
}
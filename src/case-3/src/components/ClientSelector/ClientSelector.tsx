import React from "react";

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

interface IClientSelectorProps {
    onClientSelected: (clientId: string) => void;
}

const ClientSelector = (props: IClientSelectorProps) => {
    const clientsOptions = clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)

    return (
        <select name="clients" onChange={(event) => props.onClientSelected(event?.target.value)}>
            <option key="" value=""></option>
            {clientsOptions}
      </select>
    );
}

export default ClientSelector;
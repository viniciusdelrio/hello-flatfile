import React, { useEffect, useState } from "react";
import { Client } from "../../models/Client"

interface IClientSelectorProps {
    onClientSelected: (clientId: string) => void;
}

const ClientSelector = (props: IClientSelectorProps) => {
    const [clients, setClients] = useState<Client[]>([])
    const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL!

    useEffect(() => {
            fetch(`${baseUrl}/clients`)
                .then(res => res.json())
                .then(data => setClients(data))
        }, 
        [baseUrl]
    )

    const clientsOptions = clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)

    return (
        <select name="clients" onChange={(event) => props.onClientSelected(event?.target.value)}>
            <option key="" value=""></option>
            {clientsOptions}
      </select>
    );
}

export default ClientSelector;
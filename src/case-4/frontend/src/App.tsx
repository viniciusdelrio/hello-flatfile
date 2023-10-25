import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSpace } from "@flatfile/react";
import ClientSelector from "./components/ClientSelector/ClientSelector";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL!

export default function App() {
  const [clientId, setClientId] = useState('')
  const [space, setSpace] = useState<{id: string, accessToken: string} | null>(null)
  const [showSpace, setShowSpace] = useState(false)

  useEffect(() => {
    if (clientId) {
      fetch(`${baseUrl}/clients/${clientId}/space`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        }).then(res => res.json().then(json => {
          if (!json.id) {
            fetch(`${baseUrl}/clients/${clientId}/space`, {
              method: "POST",
              headers: {
                "Accept": "application/json"
              }
            }).then(res => res.json().then(json => {
              setSpace(json)
              setShowSpace(true)
            }))
          } else {
            setSpace(json)
            setShowSpace(true)
          }
        }
      ))
    } else {
      setShowSpace(false)
    }
  }, [clientId])
  
  async function clientSelectedHandle(clientId: string) {
    setClientId(clientId)
  }

  const Space = ({
    setShowSpace,
  }: {
    setShowSpace: Dispatch<SetStateAction<boolean>>;
  }) => {
    const spc = useSpace({
      environmentId: process.env.REACT_APP_FLATFILE_ENVIRONMENT_ID!,
      space: {
        id: space?.id!,
        accessToken: space?.accessToken!
      }
    });
    return spc;
  };

  return (
    <div className="content">
      <h2>
        <code>Flatfile - 4th Case Study</code>
      </h2>
      <label>Select a client: </label>
      <ClientSelector onClientSelected={clientSelectedHandle}></ClientSelector>
      <div>
        {showSpace && <Space setShowSpace={setShowSpace} />}
      </div>
    </div>
  );
}

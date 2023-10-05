import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import ClientSelector from "./components/ClientSelector/ClientSelector";
import WorkbookSelector, { IWorkbook } from "./components/WorkbookSelector/WorkbookSelector";

export default function App() {
  const [showSpace, setShowSpace] = useState(false);
  const [selectedWorkbook, updateSelectedWorkbook] = useState<IWorkbook| undefined>();
  const [selectedClient, updateSelectedClient] = useState("");

  const spaceConfigs : ISpace = {
    publishableKey: process.env.REACT_APP_FLATFILE_PUBLISHABLE_KEY!,
    environmentId: process.env.REACT_APP_FLATFILE_ENVIRONMENT_ID!,
    sidebarConfig: {
      showSidebar: false,
    },
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    }  
  }

  const Space = ({
    setShowSpace,
  }: {
    setShowSpace: Dispatch<SetStateAction<boolean>>;
  }) => {
    const space = useSpace({
      ...spaceConfigs,
      workbook: selectedWorkbook?.workbook,
      listener: selectedWorkbook?.listener
    });
    return space;
  };
  
  function clientSelectedHandle(clientId: string) {
    updateSelectedClient(clientId);
    loadClientSpace(clientId, selectedWorkbook);
  }
  
  function workbookSelectedHandle(workbook: IWorkbook | undefined) {
    updateSelectedWorkbook(workbook);
    loadClientSpace(selectedClient, workbook);
  }
  
  function loadClientSpace(clientId: string | undefined, workbook: IWorkbook | undefined) {
    if (!clientId || !workbook) {
      setShowSpace(false)
      return;
    }

    setShowSpace(true)
  }

  return (
    <div className="content">
      <h2>
        <code>How to use Flatfile in Migration Process?</code>
      </h2>
      <label>Select a client: </label>
      <ClientSelector onClientSelected={clientSelectedHandle}></ClientSelector>
      <br />
      <label>What do you want to import?</label>
      <WorkbookSelector onWorkbookSelected={workbookSelectedHandle}></WorkbookSelector>
      <br />
      <div>
        {showSpace && <Space setShowSpace={setShowSpace} />}
      </div>
    </div>
  );
}

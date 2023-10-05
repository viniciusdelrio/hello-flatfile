import { ChangeEvent } from "react";
import { Flatfile } from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";

import { workbook as contactsWorkbook } from "../../workbooks/contacts/workbook";
import { listener as contatcsListener } from "../../workbooks/contacts/listener";
import { workbook as gamesWorkbook } from "../../workbooks/games/workbook";
import { listener as gamesListener } from "../../workbooks/games/listener";

export interface IWorkbook {
    id: string,
    name: string,
    workbook: Pick<Flatfile.CreateWorkbookConfig, "name" | "labels" | "sheets" | "actions">,
    listener: FlatfileListener
}

const workbooks: Array<IWorkbook> = [
    {
      id: "contacts",
      name: "Contacts",
      workbook: contactsWorkbook,
      listener: contatcsListener
    },
    {
      id: "games",
      name: "Games",
      workbook: gamesWorkbook,
      listener: gamesListener
    }
  ];

interface IWorkbookSelectorProps {
    onWorkbookSelected: (workbook: IWorkbook | undefined) => void
}

const WorkbookSelector = (props: IWorkbookSelectorProps) => {
    const workbooksOptions = workbooks.map(workbook => <option key={workbook.id} value={workbook.id}>{workbook.name}</option>)

    function onChangeHandler(event : ChangeEvent<HTMLSelectElement>) {
        const workbook = workbooks.find(w => w.id === event.target.value);
        props.onWorkbookSelected(workbook);
    }
    
    return (
        <select name="workbooks" onChange={onChangeHandler}>
            <option key="" value=""></option>
            {workbooksOptions}
        </select>
    );
};

export default WorkbookSelector
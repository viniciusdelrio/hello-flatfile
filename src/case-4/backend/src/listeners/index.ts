import { Client } from "@flatfile/listener";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { recordHook } from "@flatfile/plugin-record-hook";
import { contactsSheetListener } from "./ContactsSheetListener"
import { gamesSheetListener } from  "./GamesSheetListener"
import { workbookListener } from "./WorkbookListener";

export default function flatfileEventListener(listener: Client) {
    listener.use(
        recordHook("contacts", contactsSheetListener.recordHook)
    )

    listener
        .on("job:ready", { job: "sheet:submitcontacts" } ,contactsSheetListener.submitAction)

    listener.use(
        recordHook("games", gamesSheetListener.recordHook)
    )

    listener
        .on("job:ready", { job: "sheet:submitgames" }, gamesSheetListener.submitAction)

    listener
        .on("job:ready", { job: "workbook:submit" }, workbookListener.submitAction)

    listener.use(ExcelExtractor());
}
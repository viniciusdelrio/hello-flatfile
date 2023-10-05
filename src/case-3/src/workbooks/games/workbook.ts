import { Flatfile } from "@flatfile/api";

export const workbook: Pick<
  Flatfile.CreateWorkbookConfig,
  "name" | "labels" | "sheets" | "actions"
> = {
  name: "Games",
  labels: ["pinned"],
  sheets: [
    {
      name: "Games",
      slug: "games",
      fields: [
        {
          key: "name",
          type: "string",
          label: "Name",
        },
        {
          key: "genre",
          type: "string",
          label: "Genre",
        },
        {
          key: "publisher",
          type: "string",
          label: "Publisher",
        },
      ],
    },
  ],
  actions: [
    {
      operation: "submitActionFg",
      mode: "foreground",
      label: "Submit foreground",
      description: "Submit data to webhook.site",
      primary: true,
    },
  ],
};
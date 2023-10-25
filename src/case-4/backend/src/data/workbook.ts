import { CreateWorkbookConfig } from "@flatfile/api/api";

export const workbookTemplate : CreateWorkbookConfig = {
    name: "Migration process",
    sheets: [
        {
            name: "Contacts",
            slug: "contacts",
            description: "Description of the sheet Contacts :D",
            allowAdditionalFields: false,
            access: [
                "*"
            ],
            fields: [
                {
                    key: "firstName",
                    type: "string",
                    label: "First Name",
                    description: "Description of the field First Name :D",
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                },
                {
                    key: "lastName",
                    type: "string",
                    label: "Last Name",
                    description: "Description of the field Last Name :D",
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                },
                {
                    key: "email",
                    type: "string",
                    label: "E-mail",
                    description: "Description of the field E-mail :D",
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                }
            ],
            actions: [
                {
                    label: "Submit this sheet",
                    description: "Submit all the data of this sheet to the backend",
                    tooltip: "Submit all the data of this sheet to the backend",
                    operation: "submitcontacts",
                    mode: "foreground",
                    primary: true,
                    confirm: true,
                    requireAllValid: true,
                    requireSelection: false
                }
            ]
        },
        {
            name: "Games",
            slug: "games",
            description: "Description of the sheet Games :D",
            allowAdditionalFields: false,
            access: [
                "*"
            ],
            fields: [
                {
                    key: "name",
                    type: "string",
                    label: "Name",
                    description: "Description of the field Name :D",
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                },
                {
                    key: "genre",
                    type: "enum",
                    label: "Genre",
                    description: "Description of the field Genre :D",
                    config: {
                        options: [
                            {
                                value: "actionrpg",
                                label: "Action RPG"
                            },
                            {
                                value: "mmorpg",
                                label: "MMORPG"
                            },
                            {
                                value: "puzzle",
                                label: "Puzzle"
                            }
                        ]
                    },
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                },
                {
                    key: "publisher",
                    type: "enum",
                    label: "Publisher",
                    description: "Description of the field Publisher :D",
                    config: {
                        options: [
                            {
                                value: "blizzard",
                                label: "Blizzard",
                            },
                            {
                                value: "vgdr",
                                label: "VGDR",
                            }
                        ]
                    },
                    constraints: [
                        {
                            type: "required"
                        }
                    ],
                    readonly: false
                }
            ],
            actions: [
                {
                    label: "Submit this sheet",
                    description: "Submit all the data of this sheet to the backend",
                    tooltip: "Submit all the data of this sheet to the backend",
                    operation: "submitgames",
                    mode: "foreground",
                    primary: true,
                    confirm: true,
                    requireAllValid: true,
                    requireSelection: false
                }
            ]
        }
    ],
    actions: [
        {
            label: "Submit all sheets",
            description: "Submit all the data of ALL sheets to the backend",
            tooltip: "Submit all the data of ALL sheets to the backend",
            operation: "submit",
            mode: "foreground",
            primary: true,
            confirm: true,
            requireAllValid: true,
            requireSelection: false
        }
    ]
}
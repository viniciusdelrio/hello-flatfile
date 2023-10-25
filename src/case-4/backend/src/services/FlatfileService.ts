import { workbookTemplate } from '../data/workbook'
import api from '@flatfile/api'

export const getSpaceById = async (spaceId: string) => {
    const space = await api.spaces.get(spaceId)
    return space.data
}

export type CreateSpaceParams = {
    name: string
}

export const createSpaceWithWorkbook = async (spaceName: string) => {
    const space = await createSpace({name: spaceName})
    await createWorkbook(space.id)

    return space
}

export const createSpace = async (params: CreateSpaceParams) => {
    const space = await api.spaces.create({
        environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
        name: params.name,
        actions: [
            {
                label: "MY FIRST ACTION!"
            }
        ]
    })

    return space.data;
}

export const createWorkbook = async (spaceId: string) => {
    const workbook = await api.workbooks.create({
        ...workbookTemplate,
        spaceId,
        environmentId: process.env.FLATFILE_ENVIRONMENT_ID
    })

    return workbook.data;
}
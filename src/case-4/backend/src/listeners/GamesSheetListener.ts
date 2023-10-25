import api from "@flatfile/api";
import { FlatfileEvent } from "@flatfile/listener";
import { FlatfileRecord } from "@flatfile/plugin-record-hook";
import axios from 'axios'

const RECORD_COLUMN = {
    NAME: "name",
}

const getGamesMappedData = async(sheetId: string) => {
    const { data: { records: records }} = await api.records.get(sheetId)
    const mappedRecords = records.map(m => ({
        name: m.values.name.value,
        genre: m.values.genre.value,
        publisher: m.values.publisher.value
    }))
    
    return mappedRecords
}

const recordHook = (record: FlatfileRecord) => {
    applyDataTransformation(record)
    applyDataValidation(record)

    return record;
}

const submitAction = async (event: FlatfileEvent) => {
    
    const {
        context: { jobId, workbookId }
      } = event;
      const { data: sheets } = await api.sheets.list({ workbookId })

    try {
        await api.jobs.ack(jobId, {
            info: "Starting job to submit action to webhook.site",
            progress: 10
        })

        const games = await getGamesMappedData(sheets[1].id)

        await api.jobs.ack(jobId, {
            info: "Data prepared to send forward",
            progress: 50
        })

        const response = await axios.post(
            process.env.WEBHOOK_SITE_URL!,
            {
                data: games
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if (response.status === 200) {
            await api.jobs.complete(jobId, {
                outcome: {
                    message: `Data was successfully submitted to ${process.env.WEBHOOK_SITE_URL}`
                }
            })
        } else 
            throw new Error(`Failed to submit data to ${process.env.WEBHOOK_SITE_URL}`)
    } catch (error) {
        console.log(error)

        await api.jobs.fail(jobId, {
            outcome: {
                message: "This job failed to run!"
            }
        })
    }
}

function applyDataValidation(record: FlatfileRecord) {
    const nameValue = record.get(RECORD_COLUMN.NAME) as string

    if (nameValue.length < 3) {
      record.addError(RECORD_COLUMN.NAME, "Name must have 3 characters!");
    }
}

function applyDataTransformation(record: FlatfileRecord) {
    trim(record, RECORD_COLUMN.NAME)
}

function trim(record: FlatfileRecord, fieldName: string) {
    const fieldValue = record.get(fieldName)
    if (typeof fieldValue === "string") {
        record.set(fieldName, fieldValue.trim())
    }
}

export const gamesSheetListener = {
    recordHook,
    submitAction,
    getGamesMappedData
}
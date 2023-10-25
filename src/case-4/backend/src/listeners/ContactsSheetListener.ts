import { FlatfileEvent } from "@flatfile/listener"
import { FlatfileRecord } from "@flatfile/plugin-record-hook"
import api from '@flatfile/api'
import axios from 'axios'

const RECORD_COLUMN = {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email"
}

const getContactsMappedData = async (sheetId: string) => {
    const { data: { records: records }} = await api.records.get(sheetId)
    const mappedRecords = records.map(m => ({
        firstName: m.values.firstName.value,
        lastName: m.values.lastName.value,
        email: m.values.email.value
    }))

    return mappedRecords
}

const recordHook = (record: FlatfileRecord) => {
    applyDataValidation(record)
    applyDataTransformation(record)

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

        const contacts = await getContactsMappedData(sheets[0].id)

        await api.jobs.ack(jobId, {
            info: "Data prepared to send forward",
            progress: 50
        })

        const response = await axios.post(
            process.env.WEBHOOK_SITE_URL!,
            {
                contacts
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
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = record.get(RECORD_COLUMN.EMAIL) as string

    if (!validEmailRegex.test(emailValue)) {
      record.addError(RECORD_COLUMN.EMAIL, "Invalid email address");
    }
}

function applyDataTransformation(record: FlatfileRecord) {
    toLowerCase(record, RECORD_COLUMN.FIRST_NAME)
    toLowerCase(record, RECORD_COLUMN.LAST_NAME)
    toLowerCase(record, RECORD_COLUMN.EMAIL)
}

function toLowerCase(record: FlatfileRecord, fieldName: string) {
    const fieldValue = record.get(fieldName)
    if (typeof fieldValue === "string") {
        record.set(fieldName, fieldValue.toLowerCase())
    }
}

export const contactsSheetListener = {
    recordHook,
    submitAction,
    getContactsMappedData
}
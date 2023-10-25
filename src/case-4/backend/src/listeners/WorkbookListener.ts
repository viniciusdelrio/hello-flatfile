import api from "@flatfile/api"
import { FlatfileEvent } from "@flatfile/listener"
import axios from "axios"
import { contactsSheetListener } from './ContactsSheetListener'
import { gamesSheetListener } from "./GamesSheetListener"

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

        const contacts = await contactsSheetListener.getContactsMappedData(sheets[0].id)

        await api.jobs.ack(jobId, {
            info: "All contacts are prepared to send",
            progress: 40
        })

        const games = await gamesSheetListener.getGamesMappedData(sheets[1].id)

        await api.jobs.ack(jobId, {
            info: "All games are pre[ared to send",
            progress: 70
        })

        const response = await axios.post(
            process.env.WEBHOOK_SITE_URL!,
            {
                contacts,
                games
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

export const workbookListener = {
    submitAction
}
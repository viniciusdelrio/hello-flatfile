import { FlatfileListener } from "@flatfile/listener";
import api from "@flatfile/api";
import { recordHook } from "@flatfile/plugin-record-hook";

/**
 * Example Listener
 */
export const listener = FlatfileListener.create((listener) => {
  listener.on("**", (event) => {
    console.log(`Received event: ${event.topic}`);
  });

  listener.use(
    recordHook("contacts", (record) => {
      const firstName = record.get("firstName");
      console.log({ firstName });
      record.set("lastName", "Rock");
      return record;
    })
  );

  listener.on(
    "job:ready",
    { job: "workbook:submitActionFg" },
    async ({ context: { jobId } }) => {
      try {
        await api.jobs.ack(jobId, {
          info: "Getting started.",
          progress: 10,
        });

        // Make changes after cells in a Sheet have been updated
        console.log("Make changes here when an action is clicked");

        await api.jobs.complete(jobId, {
          outcome: {
            message: "This job is now complete.",
          },
        });
      } catch (error: any) {
        console.error("Error:", error.stack);

        await api.jobs.fail(jobId, {
          outcome: {
            message: "This job encountered an error.",
          },
        });
      }
    }
  );
});

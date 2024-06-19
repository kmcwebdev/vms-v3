import { query } from "@/lib/db";

export async function DELETE(req, { params }) {
    let responseMessage = { message: "Invalid Request" };
    const permit = params.permit;

    if (permit === "delete-gate-pass") {
      const submissionId = params.slug;

      if (!submissionId) {
        responseMessage = { message: "No submission ID provided" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      try {
        const deleteQuery = `DELETE FROM gate_pass_submissions WHERE submission_id = $1 RETURNING submission_id;`;
        const result = await query(deleteQuery, [submissionId]);

        if (result.rows.length === 0) {
          responseMessage = { message: "No record found with the provided ID" };
          return new Response(JSON.stringify(responseMessage), {
            headers: { "Content-Type": "application/json" },
            status: 404,
          });
        }

        console.log(`Deleted gate pass with ID: ${submissionId}`);
        responseMessage = { message: "Deleted Successfully", id: submissionId };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        console.error("Error processing delete request:", error);
        responseMessage = {
          message: "An error occurred while processing the delete request",
        };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    } else if (permit === "delete-work-permit") {
        const submissionId = params.slug;

      if (!submissionId) {
        responseMessage = { message: "No submission ID provided" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      try {
        const deleteQuery = `DELETE FROM work_permit_submissions WHERE submission_id = $1 RETURNING submission_id;`;
        const result = await query(deleteQuery, [submissionId]);

        if (result.rows.length === 0) {
          responseMessage = { message: "No record found with the provided ID" };
          return new Response(JSON.stringify(responseMessage), {
            headers: { "Content-Type": "application/json" },
            status: 404,
          });
        }

        console.log(`Deleted work permit with ID: ${submissionId}`);
        responseMessage = { message: "Deleted Successfully", id: submissionId };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        console.error("Error processing delete request:", error);
        responseMessage = {
          message: "An error occurred while processing the delete request",
        };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    } else if (permit === "delete-temp-parking") {
        const submissionId = params.slug;

      if (!submissionId) {
        responseMessage = { message: "No submission ID provided" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      try {
        const deleteQuery = `DELETE FROM temp_parking_submissions WHERE submission_id = $1 RETURNING submission_id;`;
        const result = await query(deleteQuery, [submissionId]);

        if (result.rows.length === 0) {
          responseMessage = { message: "No record found with the provided ID" };
          return new Response(JSON.stringify(responseMessage), {
            headers: { "Content-Type": "application/json" },
            status: 404,
          });
        }

        console.log(`Deleted temp parking with ID: ${submissionId}`);
        responseMessage = { message: "Deleted Successfully", id: submissionId };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        console.error("Error processing delete request:", error);
        responseMessage = {
          message: "An error occurred while processing the delete request",
        };

        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    }
    
    else {
      responseMessage = { message: "Invalid permit" };
      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 403,
      });
    }
  }

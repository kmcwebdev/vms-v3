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
  } else {
    responseMessage = { message: "Invalid permit" };
    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 403,
    });
  }
}

export async function PUT(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
  const permit = params.permit;
  // will soon add update-gate-pass-submission, update-work-permit-submission, and update-temp-parking-submission
  // this is for a complete edit of the form from the admin management panel or the user updating his submission while it is still pending
  if (
    ![
      "update-gate-pass-status",
      "update-work-permit-status",
      "update-temp-parking-status",
    ].includes(permit)
  ) {
    responseMessage = { message: "Invalid permit" };
    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 403,
    });
  }

  const submissionId = params.slug;
  const { status: newStatus } = await req.json();

  if (!submissionId || !newStatus) {
    responseMessage = { message: "Submission ID and new status are required" };
    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  let updateQuery;
  let tableName;

  switch (permit) {
    case "update-gate-pass-status":
      tableName = "gate_pass_submissions";
      break;
    case "update-work-permit-status":
      tableName = "work_permit_submissions";
      break;
    case "update-temp-parking-status":
      tableName = "temp_parking_submissions";
      break;
  }

  try {
    updateQuery = `UPDATE ${tableName} SET status = $1 WHERE submission_id = $2 RETURNING submission_id;`;
    const result = await query(updateQuery, [newStatus, submissionId]);

    if (result.rows.length === 0) {
      responseMessage = { message: "No record found with the provided ID" };
      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    console.log(
      `Updated ${permit.replace("update-", "").replace("-", " ")} with ID: ${submissionId}`,
    );
    responseMessage = { message: "Updated Successfully", id: submissionId };

    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing update request:", error);
    responseMessage = {
      message: "An error occurred while processing the update request",
    };

    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

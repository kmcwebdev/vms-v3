import { gatePassSchema } from "@/schema/gate-pass";
import { workPermitSchema } from "@/schema/work-permit";
import { query } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
  const { userId } = auth();
  const user_id = userId;
  const permit = params.permit;
  const submissionId = params.slug;

  if (
    [
      "update-gate-pass-status",
      "update-work-permit-status",
      "update-temp-parking-status",
    ].includes(permit)
  ) {
    const { status: newStatus } = await req.json();

    if (!submissionId || !newStatus) {
      responseMessage = {
        message: "Submission ID and new status are required",
      };
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
  } else if (permit === "post-gate-pass") {
    try {
      const data = await req.json();
      console.log(data);

      const {
        submission_id,
        type,
        email,
        name,
        service_category,
        site,
        floor,
        carrier_name,
        company,
        date_from,
        date_to,
        reason,
        emails_to_notify,
        items,
        files,
        status,
        user_id
      } = data;

      const emailsToNotifyArray = emails_to_notify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);

      const updateQuery = `
        UPDATE gate_pass_submissions SET
          type = $2, email = $3, name = $4, service_category = $5, site = $6, floor = $7,
          carrier_name = $8, company = $9, date_from = $10, date_to = $11, reason = $12, 
          emails_to_notify = $13, items = $14, files = $15, status = $16, user_id = $17
        WHERE submission_id = $1
        RETURNING submission_id;
      `;

      const values = [
        submission_id,
        type,
        email,
        name,
        service_category,
        site,
        floor,
        carrier_name,
        company,
        date_from,
        date_to,
        reason,
        formattedEmailsToNotify,
        formattedItems,
        files,
        status,
        user_id
      ];

      await query(updateQuery, values);
      responseMessage = { message: "Updated Successfully", id: submission_id };

      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      responseMessage = {
        message: "An error occurred while processing the request",
      };

      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  } else if (permit === "post-work-permit") {
    try {
      const data = await req.json();
      console.log(data);

      const {
        submission_id,
        type,
        email,
        name,
        work_area,
        site,
        floor,
        tenant,
        contractor,
        person_in_charge,
        number,
        date_from,
        date_to,
        work_types,
        other_work_types,
        work_requirements,
        other_work_requirements,
        emails_to_notify,
        scope,
        workers,
        items,
        files,
        status
      } = data;

      const emailsToNotifyArray = emails_to_notify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);
      const formattedWorkers = JSON.stringify(workers);

      const updateQuery = `
        UPDATE work_permit_submissions SET
          type = $2, email = $3, name = $4, work_area = $5, site = $6, floor = $7, tenant = $8, 
          contractor = $9, person_in_charge = $10, number = $11, date_from = $12, date_to = $13, 
          work_types = $14, other_work_types = $15, work_requirements = $16, other_work_requirements = $17, 
          emails_to_notify = $18, scope = $19, workers = $20, items = $21, files = $22, status = $23, user_id = $24
        WHERE submission_id = $1
        RETURNING submission_id
      `;

      const values = [
        submission_id,
        type,
        email,
        name,
        work_area,
        site,
        floor,
        tenant,
        contractor,
        person_in_charge,
        number,
        date_from,
        date_to,
        work_types,
        other_work_types,
        work_requirements,
        other_work_requirements,
        formattedEmailsToNotify,
        scope,
        formattedWorkers,
        formattedItems,
        files,
        status,
        user_id,
      ];

      await query(updateQuery, values);

      responseMessage = { message: "Updated Successfully", id: submission_id };

      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      responseMessage = {
        message: "An error occurred while processing the request",
      };

      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  } else if (permit === "post-temp-parking") {
    try {
      const data = await req.json();
      console.log(data);

      const {
        submission_id,
        type,
        email,
        name,
        site,
        floor,
        driver_name,
        vehicle_model,
        vehicle_color,
        vehicle_number,
        parking_number,
        date_from,
        date_to,
        manager_email,
        files,
        status,
        user_id
      } = data;

      const updateQuery = `
        UPDATE temp_parking_submissions SET
          type = $2, email = $3, name = $4, site = $5, floor = $6, driver_name = $7, 
          vehicle_model = $8, vehicle_color = $9, vehicle_number = $10, parking_number = $11, 
          date_from = $12, date_to = $13, manager_email = $14, files = $15, status=$16, user_id = $17
        WHERE submission_id = $1
        RETURNING submission_id;
      `;

      const values = [
        submission_id,
        type,
        email,
        name,
        site,
        floor,
        driver_name,
        vehicle_model,
        vehicle_color,
        vehicle_number,
        parking_number,
        date_from,
        date_to,
        manager_email,
        files,
        status,
        user_id
      ];

      await query(updateQuery, values);

      responseMessage = { message: "Updated Successfully", id: submission_id };

      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      responseMessage = {
        message: "An error occurred while processing the request",
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

export async function DELETE(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
  const permit = params.permit;

  if (
    ["delete-gate-pass", "delete-work-permit", "delete-temp-parking"].includes(
      permit,
    )
  ) {
    const submissionId = params.slug;
    if (!submissionId) {
      responseMessage = { message: "No submission ID provided" };
      return new Response(JSON.stringify(responseMessage), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    let deleteQuery;
    let tableName;

    switch (permit) {
      case "delete-gate-pass":
        tableName = "gate_pass_submissions";
        break;
      case "delete-work-permit":
        tableName = "work_permit_submissions";
        break;
      case "delete-temp-parking":
        tableName = "temp_parking_submissions";
        break;
    }

    try {
      deleteQuery = `DELETE FROM ${tableName} WHERE submission_id = $1 RETURNING submission_id;`;
      const result = await query(deleteQuery, [submissionId]);

      if (result.rows.length === 0) {
        responseMessage = { message: "No record found with the provided ID" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }
      console.log(`Deleted request with ID: ${submissionId}`);
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


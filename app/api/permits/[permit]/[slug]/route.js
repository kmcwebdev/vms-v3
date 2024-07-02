import { gatePassSchema } from "@/schema/gate-pass";
import { workPermitSchema } from "@/schema/work-permit";
import { query } from "@/lib/db";
import { tempParkingSchema } from "@/schema/temp-parking";
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
      const parsedData = gatePassSchema.safeParse(data);

      if (!parsedData.success) {
        responseMessage = {
          message: "Validation errors",
          errors: parsedData.error.errors,
        };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      const {
        type,
        email,
        name,
        serviceCategory,
        site,
        floor,
        carrierName,
        company,
        dateRange,
        reason,
        emailsToNotify,
        items,
        files,
        status,
      } = parsedData.data;

      const emailsToNotifyArray = emailsToNotify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);

      const updateQuery = `
        UPDATE gate_pass_submissions SET
          type = $1, email = $2, name = $3, service_category = $4, site = $5, floor = $6,
          carrier_name = $7, company = $8, date_from = $9, date_to = $10, reason = $11, 
          emails_to_notify = $12, items = $13, files = $14, status = $15, user_id = $16
        WHERE submission_id = $17;
      `;

      const values = [
        type,
        email,
        name,
        serviceCategory,
        site,
        floor,
        carrierName,
        company,
        dateRange.from,
        dateRange.to,
        reason,
        formattedEmailsToNotify,
        formattedItems,
        files,
        status,
        user_id,
        submissionId,
      ];

      await query(updateQuery, values);

      responseMessage = { message: "Updated Successfully", id: submissionId };

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
      const parsedData = workPermitSchema.safeParse(data);

      if (!parsedData.success) {
        responseMessage = {
          message: "Validation errors",
          errors: parsedData.error.errors,
        };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      const {
        type,
        email,
        name,
        workArea,
        site,
        floor,
        tenant,
        contractor,
        personInCharge,
        number,
        dateRange,
        workTypes,
        otherWorkTypes,
        workRequirements,
        otherWorkRequirements,
        emailsToNotify,
        scope,
        workers,
        items,
        files,
        status
      } = parsedData.data;

      const emailsToNotifyArray = emailsToNotify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);
      const formattedWorkers = JSON.stringify(workers);

      const updateQuery = `
        UPDATE work_permit_submissions SET
          type = $1, email = $2, name = $3, work_area = $4, site = $5, floor = $6, tenant = $7, 
          contractor = $8, person_in_charge = $9, number = $10, date_from = $11, date_to = $12, 
          work_types = $13, other_work_types = $14, work_requirements = $15, other_work_requirements = $16, 
          emails_to_notify = $17, scope = $18, workers = $19, items = $20, files = $21, status = $22, user_id = $23
        WHERE submission_id = $24;
      `;

      const values = [
        type,
        email,
        name,
        workArea,
        site,
        floor,
        tenant,
        contractor,
        personInCharge,
        number,
        dateRange.from,
        dateRange.to,
        workTypes,
        otherWorkTypes,
        workRequirements,
        otherWorkRequirements,
        formattedEmailsToNotify,
        scope,
        formattedWorkers,
        formattedItems,
        files,
        status,
        user_id,
        submissionId,
      ];

      await query(updateQuery, values);

      responseMessage = { message: "Updated Successfully", id: submissionId };

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
        driverName,
        vehicleModel,
        vehicleColor,
        vehicleNumber,
        parkingNumber,
        date_from,
        date_to,
        managerEmail,
        files,
        status,
        userId
      } = data;

      const updateQuery = `
        UPDATE temp_parking_submissions SET
          type = $1, email = $2, name = $3, site = $4, floor = $5, driver_name = $6, 
          vehicle_model = $7, vehicle_color = $8, vehicle_number = $9, parking_number = $10, 
          date_from = $11, date_to = $12, manager_email = $13, files = $14, status=$15, user_id = $16
        WHERE submission_id = $17;
      `;

      const values = [
        submission_id,
        type,
        email,
        name,
        site,
        floor,
        driverName,
        vehicleModel,
        vehicleColor,
        vehicleNumber,
        parkingNumber,
        date_from,
        date_to,
        managerEmail,
        files,
        status,
        userId
      ];

      await query(updateQuery, values);

      responseMessage = { message: "Updated Successfully", id: submissionId };

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
import { gatePassSchema } from "@/schema/gate-pass";
import { workPermitSchema } from "@/schema/work-permit";
import { query } from "@/lib/db";
import { tempParkingSchema } from "@/schema/temp-parking";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
  const { userId } = auth();
  const permit = params.permit;

  if (permit === "post-gate-pass") {
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
      } = parsedData.data;
      const status = "Pending";
      const user_id = userId;

      const emailsToNotifyArray = emailsToNotify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);

      const insertQuery = `
        INSERT INTO gate_pass_submissions (
          type, email, name, service_category, site, floor, carrier_name, 
          company, date_from, date_to, reason, emails_to_notify, items, files, status, user_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        ) RETURNING submission_id;
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
      ];

      const result = await query(insertQuery, values);
      const insertedId = result.rows[0].submission_id;

      console.log(`Inserted gate pass with ID: ${insertedId}`);

      responseMessage = { message: "Saved Successfully", id: insertedId };

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
      } = parsedData.data;
      const status = "Pending";
      const user_id = userId;

      const emailsToNotifyArray = emailsToNotify || [];
      const formattedEmailsToNotify = `{${emailsToNotifyArray.map((e) => `"${e}"`).join(",")}}`;
      const formattedItems = JSON.stringify(items);
      const formattedWorkers = JSON.stringify(workers);

      const insertQuery = `
        INSERT INTO work_permit_submissions (
          type, email, name, work_area, site, floor, tenant, contractor, 
          person_in_charge, number, date_from, date_to, work_types, other_work_types, work_requirements, other_work_requirements, 
          emails_to_notify, scope, workers, items, files, status, user_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
        ) RETURNING submission_id;
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
        user_id
      ];

      const result = await query(insertQuery, values);
      const insertedId = result.rows[0].submission_id;

      console.log(`Inserted work permit with ID: ${insertedId}`);

      responseMessage = { message: "Saved Successfully", id: insertedId };

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
      const parsedData = tempParkingSchema.safeParse(data);

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
        site,
        floor,
        driverName,
        vehicleModel,
        vehicleColor,
        vehicleNumber,
        parkingNumber,
        dateRange,
        managerEmail,
        files,
      } = parsedData.data;
      const status = "Pending";
      const user_id = userId;

      const insertQuery = `
        INSERT INTO temp_parking_submissions (
          type, email, name, site, floor, driver_name, vehicle_model,
          vehicle_color, vehicle_number, parking_number, date_from, date_to,
          manager_email, files, status, user_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        ) RETURNING submission_id;
      `;

      const values = [
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
        dateRange.from,
        dateRange.to,
        managerEmail,
        files,
        status,
        user_id
      ];

      const result = await query(insertQuery, values);
      const insertedId = result.rows[0].submission_id;

      console.log(`Inserted Temp Parking with ID: ${insertedId}`);

      responseMessage = { message: "Saved Successfully", id: insertedId };

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

export async function GET(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
  const permit = params.permit;

  if (permit === "get-gate-pass") {
    try {
      let selectQuery = `
        SELECT 
          submission_id, type, email, name, service_category, site, floor, carrier_name, 
          company, date_from, date_to, reason, emails_to_notify, items, files, status
        FROM 
          gate_pass_submissions
      `;
      const result = await query(selectQuery);

      if (result.rows.length === 0) {
        responseMessage = { message: "No records found" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }
      responseMessage = {
        message: "Records retrieved successfully",
        data: result.rows,
      };
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
  } else if (permit === "get-work-permit") {
    try {
      let selectQuery = `
        SELECT
          submission_id, type, email, name, work_area, site, floor, tenant,
          contractor, person_in_charge, number, date_from, date_to, work_types,
          other_work_types, work_requirements, other_work_requirements,
          emails_to_notify, scope, workers, items, files, status
        FROM
          work_permit_submissions
      `;

      const result = await query(selectQuery);

      if (result.rows.length === 0) {
        responseMessage = { message: "No records found" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }
      responseMessage = {
        message: "Records retrieved successfully",
        data: result.rows,
      };
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
  } else if (permit === "get-temp-parking") {
    try {
      let selectQuery = `
      SELECT 
        submission_id, type, email, name, site, floor, driver_name, vehicle_model,
        vehicle_color, vehicle_number, parking_number, date_from, date_to,
        manager_email, files, status
      FROM
        temp_parking_submissions
    `;

      const result = await query(selectQuery);

      if (result.rows.length === 0) {
        responseMessage = { message: "No records found" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }
      responseMessage = {
        message: "Records retrieved successfully",
        data: result.rows,
      };
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
  }
  // will soon add get-gate-pass-unique, get-work-permit-unique, and get-temp-parking-unique
  else {
    responseMessage = { message: "Invalid permit" };
    return new Response(JSON.stringify(responseMessage), {
      headers: { "Content-Type": "application/json" },
      status: 403,
    });
  }
}

import { gatePassSchema } from "@/schema/gate-pass";

export async function POST(req, { params }) {
  let responseMessage = { message: "Invalid Request" };
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

      console.log(
        `Received data: type=${type}, email=${email}, name=${name}, serviceCategory=${serviceCategory}, site=${site}, floor=${floor}, carrierName=${carrierName}, company=${company}, dateFrom=${dateRange.from}, dateTo=${dateRange.to}, reason=${reason}, items=${items ? items.length : 0}`
      );

      // Check for required fields
      if (!type || !email || !name || !serviceCategory || !site || !floor || !carrierName || !company || !dateRange) {
        responseMessage = { message: "Please fill out all required fields" };
        return new Response(JSON.stringify(responseMessage), {
          headers: { "Content-Type": "application/json" },
          status: 400, // Bad request due to missing required fields
        });
      }

      responseMessage = { message: "Saved Successfully" };

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

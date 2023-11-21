import { parse } from "json2csv";

export async function GET(req: Request) {
  const data = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ];

  const csv = parse(data);

  return new Response(csv, {
    headers: {
      "content-disposition": `attachment; filename="data.csv"`,
    },
  });
}

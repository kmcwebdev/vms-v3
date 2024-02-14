// hooks/useDownloadCSV.ts
import axios from "axios";
import { useCallback } from "react";

type DownloadCSVParams = {
  siteSelected: string;
  dateSelected: {
    from: string;
    to: string;
  };
};

export const useDownloadCSV = () => {
  const downloadCSV = useCallback(async ({ siteSelected, dateSelected }: DownloadCSVParams) => {
    try {
      const response = await axios.get("/api/visitors/export-csv", {
        responseType: "blob",
        params: {
          site_id: siteSelected,
          from: dateSelected.from,
          to: dateSelected.to,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"] || 'visitors-export.csv';

      link.setAttribute("download", contentDisposition);
      document.body.appendChild(link);
      link.click();

      // Clean up to avoid memory leaks
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  return downloadCSV;
};
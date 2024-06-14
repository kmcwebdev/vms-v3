import React, { useState } from "react";
import { XIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { PickerOverlay } from "filestack-react";
import { Button } from "@/components/ui/button";

export default function FileUpload({ formControl }: { formControl: any }) {
  const { setValue, watch } = useFormContext();
  const [fileError, setFileError] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const attachedFiles = watch("files") || [];
  const [fileDetails, setFileDetails] = useState<any[]>([]);


  const handleUploadButtonClick = () => {
    setPickerVisible(true);
  };

  const onFileUploadSuccess = (result: any) => {
    setPickerVisible(false);

    const newFileDetails = result.filesUploaded.map((file: any) => ({
      url: file.url,
      filename: file.filename,
      size: file.size
    }));

    // Store only URLs in the `files` field
    const newFileUrls = newFileDetails.map((file: any) => file.url);
    setValue("files", [...attachedFiles, ...newFileUrls]);

    // Store file details separately
    setFileDetails((prevDetails) => [...prevDetails, ...newFileDetails]);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = attachedFiles.filter((_: any, i: number) => i !== index);
    const updatedFileDetails = fileDetails.filter((_: any, i: number) => i !== index);
    setValue("files", updatedFiles);
    setFileDetails(updatedFileDetails);
  };

  return (
    <FormField
      control={formControl.control}
      name="files"
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Attach Files</FormLabel>
          <FormControl>
            <div>
              <Button
                type="button"
                onClick={handleUploadButtonClick}
                className="block w-full bg-gray-100 text-black rounded"
              >
                Upload Files
              </Button>
              {pickerVisible && (
                <PickerOverlay
                  apikey="AOMmf7sLbQgWsPbc5fOarz" 
                  onSuccess={onFileUploadSuccess}
                  onError={(error) => {
                    console.error("File upload error:", error);
                    setPickerVisible(false);
                  }}
                  pickerOptions={{
                    maxFiles: 3 - attachedFiles.length, // limit to 3 files
                    maxSize: 15 * 1024 * 1024, // 15MB size limit
                  }}
                />
              )}
              {fileError && (
                <p className="mt-2 text-sm text-red-600">{fileError}</p>
              )}
              <ul className="mt-2">
                {fileDetails.map((file: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {file.filename} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-600"
                    >
                      <XIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

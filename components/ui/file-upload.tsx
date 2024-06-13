import React from "react";
import { XIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function FileUpload({ formControl }: { formControl: any }) {
  const { setValue, watch } = useFormContext();
  const [fileError, setFileError] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    let newFiles = Array.from(files);
    let totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);

    if (newFiles.length > 3) {
      setFileError("You can only attach up to 3 files.");
      return;
    }

    if (totalSize > 15 * 1024 * 1024) {
      setFileError("Total file size exceeds 15MB.");
      return;
    }

    setFileError(null);
    setValue("files", newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const files = watch("files") || [];
    const updatedFiles = files.filter((_: File, i: number) => i !== index);
    setValue("files", updatedFiles);
  };

  const attachedFiles = watch("files") || [];

  return (
    <FormField
      control={formControl.control}
      name="files"
      render={() => (
        <FormItem className="flex flex-col p-2">
          <FormLabel>Attach Files</FormLabel>
          <FormControl>
            <div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
              {fileError && (
                <p className="mt-2 text-sm text-red-600">{fileError}</p>
              )}
              <ul className="mt-2">
                {attachedFiles.map((file: File, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
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

import React from "react";
import { XIcon } from "lucide-react";

export default function FileUpload() {
    const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
    
        let newFiles = Array.from(files);
        let totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    
        if (attachedFiles.length + newFiles.length > 3) {
          setFileError("You can only attach up to 3 files.");
          return;
        }
    
        if (totalSize > 15 * 1024 * 1024) {
          setFileError("Total file size exceeds 15MB.");
          return;
        }
    
        setAttachedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          totalSize = updatedFiles.reduce((acc, file) => acc + file.size, 0);
    
          if (totalSize > 15 * 1024 * 1024) {
            setFileError("Total file size exceeds 15MB.");
            return prevFiles;
          } else {
            setFileError(null);
            return updatedFiles;
          }
        });
      };
    
      const handleRemoveFile = (index: number) => {
        setAttachedFiles((prevFiles) => {
          const updatedFiles = prevFiles.filter((_, i) => i !== index);
          return updatedFiles;
        });
      };
    return (
        <>
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Attach Files
            </label>
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
              {attachedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-600"
                  >
                    <XIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div></>
    );
}
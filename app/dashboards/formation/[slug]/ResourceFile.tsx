
"use client"
import { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

// Local Imports
import { Upload, Button } from "@/components/ui";

// ----------------------------------------------------------------------

interface ResourceFileProps {
  onChange?: (file: File | null) => void
}

const ResourceFile = ({ onChange }: ResourceFileProps) => {
  const [file, setFile] = useState<File[]>([]);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleChange = (files: File[]) => {
    setFile(files);
    onChange?.(files[0] ?? null);
  };

  return (
    <div className="max-w-xl">
      <div className="flex space-x-2 ">
        <Upload onChange={handleChange} ref={uploadRef} accept=".zip">
          {({ ...props }) => (
            <Button
              color="primary"
              {...props}
              className="space-x-2 "
            >
              <CloudArrowUpIcon className="size-5" />
              <span>choisir un fichier zip</span>
            </Button>
          )}
        </Upload>

        <Button
          disabled={!file.length}
          onClick={() => {
            if (uploadRef.current) uploadRef.current.value = "";
            setFile([]);
            onChange?.(null);
          }}
        >
          Reset
        </Button>
      </div>
      {file.length > 0 && (
        <div>
          nom de fichier : {file[0].name}
        </div>
      )}
    </div>
  );
};

export { ResourceFile};

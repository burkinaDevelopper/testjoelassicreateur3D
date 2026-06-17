'use client';
import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import invariant from "tiny-invariant";

// Local Imports
import { Button, Upload } from "@/components/ui";
import { FileItemSquare } from "@/components/shared/form/FileItemSquare";
import { Progressbar } from "./Progressbar";

// ----------------------------------------------------------------------

interface PreviewProps {
  label?: string;
  image?: string;
  onChange?: (file: File | null) => void;
  required?: boolean;
  count?: string;
  showProgress?: boolean;

}

const Preview = ({ 
  label, 
  onChange, 
  required= false, 
  showProgress = false,
  count = "0",
  image,
}: PreviewProps) => {
  const [file, setFile] = useState<File[]>();
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleRemove = (e: Event) => {
    invariant(uploadRef?.current, "Can't access to input file");
    e.stopPropagation();
    uploadRef.current.value = "";
    setFile([]);
  };

  useEffect(() => {
    if (!file) return;
    if (file.length > 0) onChange?.(file[0]);
    else onChange?.(null);
  }, [file, onChange]);

  return (
    <div>
      <p className="pb-1">{label}{required ? "(*)" : ""}</p>
      {image && !file && <div className="ring-primary-600 mb-1 dark:ring-primary-500 dark:ring-offset-dark-700 relative aspect-square size-20 rounded-lg ring-offset-4 ring-offset-white transition-all hover:ring-3">
         <img className="h-full w-full object-contain rounded-lg" src={image} alt="Preview" />
      </div>}
      <Upload onChange={setFile} ref={uploadRef} accept="image/*">
        {({ ...props }) =>
          file && file.length > 0 ? (
            <FileItemSquare
              handleRemove={handleRemove}
              file={file[0]}
              {...props}
            />
          ) : (
            <Button
              unstyled
              className="hover:text-primary-600 dark:text-dark-450 dark:hover:text-primary-500 size-20 shrink-0 space-x-2 rounded-lg border-2 border-current p-0 text-gray-300"
              {...props}
            >
              <PlusIcon className="size-6 stroke-2" />
            </Button>
          )
        }
      </Upload>
      {showProgress && <Progressbar count={count} />}
    </div>
  );
};

export { Preview };

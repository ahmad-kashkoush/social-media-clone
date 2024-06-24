import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
type ProfileUploaderPorps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

export default function ProfileUploader({
  fieldChange,
  mediaUrl,
}: ProfileUploaderPorps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps} = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-1 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex-center gap-4 cursor-pointer ">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-24 h-24 object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:base-semibold">
          Change Profile Photo
        </p>
      </div>
    </div>
  );
}

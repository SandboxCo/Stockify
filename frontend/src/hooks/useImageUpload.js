import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const useImageUpload = (onDropCallback) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfilePicture(file);
    if (onDropCallback) {
      onDropCallback(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    profilePicture,
  };
};

export default useImageUpload;
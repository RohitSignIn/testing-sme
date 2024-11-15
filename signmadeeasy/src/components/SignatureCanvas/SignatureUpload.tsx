import React, { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

const SignatureUpload: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // State for uploaded image

  // Clear the canvas
  const clearSignature = () => {
    setUploadedImage(null);
  };

  // Save the signature (convert to a data URL)
  const saveSignature = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      // Save the signature image with transparent background as PNG
      const dataUrl = signaturePad.toDataURL("image/png"); // PNG format supports transparency
      console.log("Signature saved as Data URL:", dataUrl);

      // Optionally, you could download the image directly by creating a download link:
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "signature.png"; // The file will be downloaded as 'signature.png'
      a.click();
    } else {
      alert("Please provide a signature before saving.");
    }
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Read file as base64-encoded data URL
    }
  };

  // Set up dropzone for drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept image files
  });

  return (
    <>
      {/* Upload Section */}
      <div className="mb-4">
        <div
          {...getRootProps()}
          style={{ height: "280px" }}
          className="relative border-2 flex flex-col justify-center items-center border-gray-200 p-6 rounded text-center cursor-pointer"
        >
          {!uploadedImage && (
            <>
              {/* Upload Button */}

              <div className="leading-loose flex flex-col items-center">
                {/* Drag-and-Drop Area */}
                <input {...getInputProps()} />
                <p className="text-sky-600 text-4xl">
                  <MdFileUpload />
                </p>
                <p className="text-sky-600">Upload Signature Image </p>
                <p className="text-gray-400">or</p>
                <p className="text-gray-400">
                  Drag and Drop your Signature here
                </p>
              </div>
            </>
          )}

          {/* Image Preview */}
          {uploadedImage && (
            <>
              <img
                src={uploadedImage}
                alt="Uploaded signature"
                className="max-w-full h-auto"
              />
              <div className="absolute right-2 bottom-2">
                <RiDeleteBin7Fill
                  onClick={clearSignature}
                  className="text-xl fill-slate-400 hover:scale-125 hover:fill-red-400 transition-all duration-300"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tip Section */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Tip: Lorem Ipsum</p>
        <div>
          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Use
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureUpload;

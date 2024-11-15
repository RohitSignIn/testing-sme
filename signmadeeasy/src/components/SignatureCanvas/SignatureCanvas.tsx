import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignatureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const [penColor, setPenColor] = useState<string>("black");

  // Initialize SignaturePad and set it up
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const signaturePadInstance = new SignaturePad(canvas, {
        minWidth: 1,
        maxWidth: 5,
        penColor,
      });
      setSignaturePad(signaturePadInstance);

      // Cleanup signaturePad instance on unmount
      return () => {
        signaturePadInstance.off();
      };
    }
  }, [penColor]);

  // Clear the canvas
  const clearSignature = () => {
    saveSignature();
    signaturePad?.clear();
  };

  // Undo last stroke
  const undo = () => {
    const data = signaturePad?.toData();
    if (data && data.length > 0) {
      data.pop(); // Remove the last stroke
      signaturePad?.fromData(data);
    }
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

  const resizeCanvas = () => {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(ratio, ratio);
      }
      // signaturePad?.clear(); // Re-clear signaturePad if needed
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <div>
        {/* Canvas Control Section */}
        <div className="mb-4 flex items-center justify-between space-x-4">
          <p className="font-medium">Draw Using Trackpad</p>

          <div className="flex items-center space-x-4">
            {/* Color Options */}
            <div className="flex space-x-2">
              <button
                className="w-6 h-6 rounded-full bg-black"
                onClick={() => setPenColor("black")}
              ></button>
              <button
                className="w-6 h-6 rounded-full bg-blue-500"
                onClick={() => setPenColor("blue")}
              ></button>
              <button
                className="w-6 h-6 rounded-full bg-red-500"
                onClick={() => setPenColor("red")}
              ></button>
              <button
                className="w-6 h-6 rounded-full bg-green-500"
                onClick={() => setPenColor("green")}
              ></button>
            </div>

            {/* Undo and Clear Buttons */}
            <div className="ml-auto flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={undo}
              >
                Undo
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={clearSignature}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Signature Pad Canvas */}
        <canvas ref={canvasRef} className="w-full h-60 bg-slate-200"></canvas>
      </div>

      {/* Tip Section */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Tip: Lorem Ipsum</p>
        <div>
          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={saveSignature}>
              Use
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureCanvas;

// import React, { useRef, useEffect, useState } from "react";
// import SignaturePad from "signature_pad";

// const SignatureCanvas: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const signaturePadInstance = new SignaturePad(canvas, {
//         minWidth: 1,
//         maxWidth: 3,
//         penColor: "rgb(66, 133, 244)",
//       });
//       setSignaturePad(signaturePadInstance);

//       // Cleanup signaturePad instance on unmount
//       return () => {
//         signaturePadInstance.off();
//       };
//     }
//   }, []);

//   const clearSignature = () => {
//     if (signaturePad) {
//       signaturePad.clear();
//     }
//   };

//   const saveSignature = () => {
//     if (signaturePad && !signaturePad.isEmpty()) {
//       const dataUrl = signaturePad.toDataURL();
//       console.log("Signature saved as Data URL:", dataUrl);
//       // You can send this data URL to the server or use it as needed
//     } else {
//       alert("Please provide a signature before saving.");
//     }
//   };

//   const resizeCanvas = () => {
//     const ratio = Math.max(window.devicePixelRatio || 1, 1);
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.width = canvas.offsetWidth * ratio;
//       canvas.height = canvas.offsetHeight * ratio;
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.scale(ratio, ratio);
//       }
//       signaturePad?.clear(); // Re-clear signaturePad if needed
//     }
//   };

//   useEffect(() => {
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Signature Pad</h2>
//       <canvas
//         ref={canvasRef}
//         style={{
//           width: "400px",
//           height: "200px",
//           border: "1px solid #000",
//         }}
//       />
//       <div>
//         <button onClick={clearSignature}>Clear</button>
//         <button onClick={saveSignature}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default SignatureCanvas;

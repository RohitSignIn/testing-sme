import html2canvas from "html2canvas";
import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignatureType: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const [penColor, setPenColor] = useState<string>("black");

  const [inputText, setInputText] = useState<string>("Sign");
  const [selectedFont, setSelectedFont] = useState<string>("cursive1");
  const [selSignElem, setSelSignElem] = useState(null);

  // Define available cursive fonts
  const fonts = [
    {
      id: "cursive1",
      name: "Cursive 1",
      fontFamily: "Brush Script MT, cursive",
    },
    {
      id: "cursive2",
      name: "Cursive 2",
      fontFamily: "Dancing Script, cursive",
    },
    { id: "cursive3", name: "Cursive 3", fontFamily: "Pacifico, cursive" },
    { id: "cursive4", name: "Cursive 4", fontFamily: "Great Vibes, cursive" },
  ];

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

  //    // Save the signature (convert to a transparent image in PNG format)
  //    const saveSignature = () => {
  //     if (signaturePad && !signaturePad.isEmpty()) {
  //       // Save the signature image with transparent background as PNG
  //       const dataUrl = signaturePad.toDataURL('image/png'); // PNG format supports transparency
  //       console.log('Signature saved as Data URL:', dataUrl);

  //       // Optionally, you could download the image directly by creating a download link:
  //       const a = document.createElement('a');
  //       a.href = dataUrl;
  //       a.download = 'signature.png'; // The file will be downloaded as 'signature.png'
  //       a.click();
  //     } else {
  //       alert('Please provide a signature before saving.');
  //     }
  //   };

  // Render the typed text on the canvas using selected font
  const renderTypedText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !inputText || !signaturePad) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Clear the canvas before rendering new text
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the font style
      ctx.font = `30px ${
        fonts.find((f) => f.id === selectedFont)?.fontFamily || "Arial"
      }`;
      ctx.fillStyle = penColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw the input text on the canvas
      ctx.fillText(inputText, canvas.width / 2, canvas.height / 2);
    }
  };

  const getPngFromDomElem = () => {
    html2canvas(document.getElementById(id), {
      backgroundColor: null,
      border: null,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Signature saved as Data URL:", dataUrl);

      // Optionally, you could download the image directly by creating a download link:
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "signature.png"; // The file will be downloaded as 'signature.png'
      a.click();
    });
  };

  // Handle font selection
  const handleFontSelect = (fontId: string) => {
    setSelectedFont(fontId);
    renderTypedText(); // Re-render the text with the selected font
  };

  return (
    <>
      <div>
        {/* Type Section */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Font Selection 2x2 Grid */}
        <div className="grid grid-cols-2 gap-1 mb-4">
          {fonts.map((font) => (
            <div
              key={font.id}
              className="cursor-pointer border p-2 flex justify-center items-center"
              onClick={() => handleFontSelect(font.id)}
              id={font.id}
              style={{
                fontFamily: font.fontFamily,
                fontSize: "2.5rem",
                textAlign: "center",
                height: "120px",
                border: selectedFont === font.id ? "2px solid #2563eb" : "none",
              }}
            >
              {inputText}
              {/* <span style={{fontFamily: font.fontFamily,}}>{inputText}</span> */}
            </div>
          ))}
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
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={getPngFromDomElem}>
              Use
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureType;

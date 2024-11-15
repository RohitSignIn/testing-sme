import React, { useState } from "react";
import SignatureCanvas from "./SignatureCanvas";
import SignatureType from "./SignatureType";
import { SignTabsEnums } from "../../enums/enums";
import SignatureUpload from "./SignatureUpload";

function SignatureTemplate() {
  const [activeTab, setActiveTab] = useState(SignTabsEnums.DRAWSIGNTAB);

  function handleTabClick(tab: SignTabsEnums) {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Title Section */}
        <h2 className="text-2xl font-semibold mb-4">Your Signature</h2>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b-2">
          <button
            className="text-lg py-2 px-4"
            onClick={() => handleTabClick(SignTabsEnums.DRAWSIGNTAB)}
          >
            Draw
          </button>
          <button
            className="text-lg py-2 px-4"
            onClick={() => handleTabClick(SignTabsEnums.TYPESIGNTAB)}
          >
            Type
          </button>
          <button
            className="text-lg py-2 px-4"
            onClick={() => handleTabClick(SignTabsEnums.UPLOADSIGNTAB)}
          >
            Upload
          </button>
          <button
            className="text-lg py-2 px-4"
            onClick={() => handleTabClick(SignTabsEnums.SAVEDSIGNTAB)}
          >
            Saved
          </button>
        </div>

        {/* Draw Tab Content */}
        <div>
          {activeTab === SignTabsEnums.DRAWSIGNTAB && <SignatureCanvas />}
          {activeTab === SignTabsEnums.TYPESIGNTAB && <SignatureType />}
          {activeTab === SignTabsEnums.UPLOADSIGNTAB && <SignatureUpload />}
        </div>
      </div>
    </>
  );
}

export default SignatureTemplate;

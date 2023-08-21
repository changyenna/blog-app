import React from 'react';

const ToolBar = ({ editor, formatText }) => {
  return (
    <div className="mb-2">
      <button
        className="bg-gray-200 px-2 py-1 rounded focus:outline-none"
        onClick={() => formatText('bold')}
      >
        <strong>B</strong>
      </button>
      <button
        className="bg-gray-200 mx-2 px-2 py-1 rounded focus:outline-none"
        onClick={() => formatText('italic')}
      >
        <em>Italic</em>
      </button>
      {/* Add more formatting buttons as needed */}
    </div>
  );
};

export default ToolBar;

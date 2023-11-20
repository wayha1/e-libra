// import React from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// const Mymodal = ({ visible, onClose, resume }) => {
//   const handleClose = () => {
//     onClose();
//   };

//   if (!visible) return null;

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex transition-opacity z-50 flex flex-col">
//       <button onClick={() => handleClose(false)} className="text-white">
//         X
//       </button>
//       <div className="bg-white p-2 rounded">
//         {resume != null && (
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//             <div style={{ height: '1000px', width: '100%' }}>
//               <Viewer fileUrl={resume} plugins={[defaultLayoutPluginInstance]} />
//             </div>
//           </Worker>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Mymodal;

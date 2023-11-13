import React from 'react'
import {Worker} from '@react-pdf-viewer/core'
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Your render function
<Viewer fileUrl="/path/to/document.pdf" />;

const Mymodal = ({ visible, onClose, resume }) => {
    const handleClose = () => {
        onClose()
    };
    if(!visible) return null;
    const defaultLayoutPluginInstance = defaultLayoutPlugin(

    );
  return (
    <div >
         <div class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex transition-opacity z-20 flex flex-col">
            <button onClick={() => handleClose(false) } className='text-white '>X</button>
            <div className="bg-white p-2 rounded scr" > 
            {/* <p>MyModal</p> */}
                {resume != null&&(
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={resume} plugins={[defaultLayoutPluginInstance]}/>
                </Worker>
            //         <>
            // <embed type='application/pdf' src={resume} width={100+ '80%'} height={100+ '80%'} />
            //         </>
                )}

            </div>
      </div>
    </div>
  )
}

export default Mymodal

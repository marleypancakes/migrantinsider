import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    position: 'absolute',
    display: 'block',
    overflow: 'auto',
    padding: '20px',
    height: 'fit-content',
    width: 'fit-content',
    left: '50%',
    right: 'auto',
    top: '50%',
    bottom:'auto',
    marginRight: '-50%',
    paddingTop: '20px',
    paddingBottom: '20px',
    transform: 'translate(-50%, -50%)',
  },
};
const MyModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Subscribe/Sign In"
      onAfterOpen={() => {document.body.style.overflow = 'hidden'; document.body.style.position = 'fixed'}}
      onAfterClose={() => {document.body.style.overflow = 'unset'; document.body.style.position = 'unset'}}
    >
      <div className="grid justify-items-center gap-3">
        {children}
        <button onClick={onRequestClose} className="w-40 p-2 bg-darkorange text-white rounded ">Close</button>
      </div>  
    </ReactModal>
  );
};

export default MyModal;
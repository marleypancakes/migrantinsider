import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    position: 'absolute',
    display: 'block',
    overflow: 'auto',
    padding: '20px',
    height: 'fit-content',
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
      <div className="h-fit grid grid-flow-row justify-items-end gap-3">
        {children}
        <button onClick={onRequestClose} className="w-20 p-2 bg-darkorange rounded ">Close</button>
      </div>  
    </ReactModal>
  );
};

export default MyModal;
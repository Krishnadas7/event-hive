import Modal from 'react-modal';
import "./Modal.css";
// import { CustomModalProps } from '../../typings/signup/modalPropType';
export interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children?: React.ReactNode;
}

Modal.setAppElement("body");

export function CustomModal(CustomModalProps:CustomModalProps){
  return (
    <Modal
      isOpen={CustomModalProps.isOpen}
      onRequestClose={CustomModalProps.onRequestClose}
      contentLabel="Example Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>{CustomModalProps.children}</div>
    </Modal>
  );
}
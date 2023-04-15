import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import styles from './modal.module.scss';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <BootstrapModal show={props.show} onHide={props.onClose}>
      <div className={styles['mask']} />
      <BootstrapModal.Body className={styles['container']}>
        <Button className={styles['close-button']} onClick={props.onClose}>
          X
        </Button>
        {props.children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
}

export default Modal;

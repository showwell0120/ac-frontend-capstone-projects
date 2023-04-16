import { Modal as BootstrapModal, Button, ButtonProps } from 'react-bootstrap';
import classNames from 'classnames';

import styles from './modal.module.scss';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  buttonProps?: ButtonProps[];
}

export function Modal(props: ModalProps) {
  return (
    <BootstrapModal
      show={props.show}
      onHide={props.onClose}
      size="lg"
      dialogClassName={classNames(
        'modal-container',
        !props?.title?.length && 'no-title'
      )}
      centered
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props?.title ?? ''}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
      {props?.buttonProps?.length && (
        <BootstrapModal.Footer>
          {props.buttonProps?.map((props, index) => (
            <Button key={`modal-button-${index}`} {...props}>
              {props.children}
            </Button>
          ))}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
}

export default Modal;

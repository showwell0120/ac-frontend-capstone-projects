import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export function Button({ onClick, text, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-primary">
      {text}
    </button>
  );
}

export default Button;

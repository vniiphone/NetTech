import { Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";


interface Props {
  label?: string;
  htmlFor?: string;
  className?: string;
  type: string;
  value: string;
  setState: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  required: boolean;
}

export const Input = ({ label, htmlFor, className, type, value, setState, placeholder, required }: Props) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label &&
        <label htmlFor={htmlFor}>{label}
          <span className={styles.redAsteristic}>*</span>
        </label>
      }
      <input
        className={styles.input}
        type={type}
        id={htmlFor}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
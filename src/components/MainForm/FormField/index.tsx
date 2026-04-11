import styles from "./styles.module.css";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

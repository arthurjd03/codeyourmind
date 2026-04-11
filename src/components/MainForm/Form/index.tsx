import styles from "./styles.module.css";

type FormProps = React.ComponentProps<"form"> & {
  children: React.ReactNode;
};

export function Form({ children, ...props }: FormProps) {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
}

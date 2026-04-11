import styles from "./styles.module.css";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ children, ...props }: SelectProps) {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  );
}

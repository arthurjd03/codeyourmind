import styles from "./styles.module.css";

type BorderProps = {
  children: React.ReactNode;
  className?: string;
};

export function Border({ children, className }: BorderProps) {
  return (
    <div className={`${styles.border} ${className || ""}`}>{children}</div>
  );
}

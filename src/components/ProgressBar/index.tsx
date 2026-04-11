import styles from "./styles.module.css";

type Props = {
  progress: number;
  color: string;
};

export function ProgressBar({ progress, color }: Props) {
  return (
    <div className={styles.container}>
      <div
        className={styles.fill}
        style={{
          width: `${progress}%`,
          background: color,
        }}
      />
    </div>
  );
}

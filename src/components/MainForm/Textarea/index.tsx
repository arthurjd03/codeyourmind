import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number;
};

export function Textarea({ maxLength, ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [props.value]);

  return (
    <div className={styles.wrapper}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        maxLength={maxLength}
        {...props}
      />

      {maxLength && (
        <span className={styles.counter}>
          {props.value?.toString().length || 0}/{maxLength}
        </span>
      )}
    </div>
  );
}

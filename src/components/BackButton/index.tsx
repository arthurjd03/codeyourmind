import { ArrowLeft } from "lucide-react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();
  
  return (
    <button
      className={styles.backButton}
      onClick={() => navigate(-1)}
      aria-label="Voltar"
    >
      <ArrowLeft size={22} />
    </button>
  );
}

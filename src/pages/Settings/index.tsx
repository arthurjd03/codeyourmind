import { Settings } from "lucide-react";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";

export default function ConfigPage() {
  return (
    <MainTemplate>
      <article className={styles.futureCard}>
        <div className={styles.blur} /> {/* Mantém a identidade do 404 */}
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Settings size={48} strokeWidth={1.5} />
          </div>

          <h3 className={styles.title}>Em breve...</h3>

          <p className={styles.description}>
            "O futuro não se prevê, se constrói. Estamos calibrando{" "}
            <span>recursos de configurações avançados</span> para antecipar seus
            resultados e maximizar seu progresso."
          </p>
        </div>
      </article>
    </MainTemplate>
  );
}

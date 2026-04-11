import { Brain } from "lucide-react";
import { RouterLink } from "../../components/Routerlink";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <section className={styles.container}>
      {/* Elementos decorativos de fundo */}
      <div className={styles.blur} />

      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Brain size={80} strokeWidth={1.5} className={styles.icon} />
        </div>

        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Fora do plano</h2>

        <p className={styles.description}>
          Essa página não faz parte do seu caminho atual. <br />
          <span>Vamos voltar ao foco?</span>
        </p>

        <RouterLink to="/home" className={styles.button}>
          Voltar ao início
        </RouterLink>
      </div>
    </section>
  );
}

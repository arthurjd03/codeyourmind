import styles from "./styles.module.css";
import { Rocket, Target, ChartNoAxesCombined, Coins } from "lucide-react";
import { RouterLink } from "../Routerlink";

export function Main() {
  return (
    <section>
      <div className={styles.header}>
        <h2 className={styles.title}>Primeiros passos</h2>
        <p className={styles.subtitle}>
          Siga estas etapas para organizar sua evolução.
        </p>
      </div>
      <ul className={styles.cards}>
        <li className={styles.card}>
          <RouterLink to="/creategoal" aria-label="Deina suas metas">
            <span className={styles.number}>1</span>

            <Target size={42} className={styles.toggle} />

            <p>Defina suas metas</p>
            <small className={styles.description}>
              Crie objetivos claros para direcionar seu crescimento.
            </small>
          </RouterLink>
        </li>

        <li className={styles.card}>
          <RouterLink to="/habits" aria-label="Crie habitos poderosos">
            <span className={styles.number}>2</span>
            <Rocket size={42} className={styles.toggle} />
            <p>Crie hábitos saudáveis</p>
            <small className={styles.description}>
              Pequenas ações diárias constroem grandes resultados.
            </small>
          </RouterLink>
        </li>

        <li className={styles.card}>
          <RouterLink to="/progress" aria-label="Acompanhe seu progresso">
            <span className={styles.number}>3</span>
            <ChartNoAxesCombined size={42} className={styles.toggle} />
            <p>Acompanhe seu progresso</p>
            <small className={styles.description}>
              Veja sua evolução e mantenha a consistência.
            </small>
          </RouterLink>
        </li>

        <li className={styles.card}>
          <RouterLink to="/finance" aria-label="Acompanhe seu progresso">
            <span className={styles.number}>4</span>
            <Coins size={42} className={styles.toggle} />
            <p>Controle financeiro</p>
            <small className={styles.description}>
              Organize receitas e despesas para crescer com equilíbrio.
            </small>
          </RouterLink>
        </li>
      </ul>
    </section>
  );
}

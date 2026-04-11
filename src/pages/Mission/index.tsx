import { Target } from "lucide-react"; // Sugestão de ícone
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";

export default function Mission() {
  return (
    <MainTemplate>
      <main className={styles.container}>
        <div className={styles.blur} />

        <article className={styles.content}>
          <div className={styles.iconWrapper}>
            <Target size={64} strokeWidth={1.5} />
          </div>

          <h1 className={styles.title}>Nossa missão</h1>

          <div className={styles.description}>
            <p>
              Este aplicativo foi criado para ajudar você a transformar
              <span> ideias em objetivos reais</span>. Organizamos suas metas
              pessoais, profissionais e financeiras em um único lugar.
            </p>

            <p>
              Oferecemos um espaço limpo, rápido e intuitivo para você registrar
              suas etapas diárias. Mais do que um gerenciador, somos um convite
              para você desenvolver{" "}
              <strong>disciplina, clareza e constância</strong>.
            </p>

            <p className={styles.highlight}>
              Afinal, evoluir um pouco todos os dias gera grandes resultados.
            </p>
          </div>
        </article>
      </main>
    </MainTemplate>
  );
}

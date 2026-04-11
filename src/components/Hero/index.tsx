import styles from "./styles.module.css";
import hero from "../../assets/img/logo.png";
import { Border } from "../Border";

export function Hero() {
  return (
    <div className={styles.container}>
      <Border>
        <section className={styles.entry}>
          <div>
            <h1 className={styles.title}>
              Desbloqueie seu potencial e <br />
              programe seu futuro.
            </h1>
            <p className={styles.text}>
              CYM ajuda você á definir metas, criar hábitos saudáveis e
              acompanhar seu progresso.
            </p>
          </div>
          <img
            src={hero}
            alt="Cérebro tecnológico com foguete"
            className={styles.logo}
          />
        </section>
      </Border>
    </div>
  );
}

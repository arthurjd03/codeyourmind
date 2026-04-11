import {Mail, Brain } from "lucide-react";
import styles from "./styles.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Brain size={28} strokeWidth={1.5} />
            <span>CodeYourMind</span>
          </div>
          <p>Transformando disciplina em resultados.</p>
        </div>

        <div className={styles.social}>
          <a
            href="https://github.com/arthurjd03"
            aria-label="Github"
            target="_blank"
            className={styles.social_github}
          >
            <p>Github</p>
          </a>
          <a
            href="https://linkedin.com/in/arthurjose01"
            aria-label="LinkedIn"
            target="_blank"
            className={styles.social_linkedin}
          >
            <p>Linkedin</p>
          </a>
          <a href="#" aria-label="Email" target="_blank">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>CodeYourMind &copy; {currentYear} — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

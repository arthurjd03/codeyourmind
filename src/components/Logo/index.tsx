import styles from "./styles.module.css";
import logo from "../../assets/img/logo-top.png";

export function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Cérebro tecnológico" className={styles.logoImg} />
      <p>CYM</p>
    </div>
  );
}


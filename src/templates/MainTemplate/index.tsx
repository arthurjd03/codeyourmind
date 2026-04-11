import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { Menu } from "../../components/Menu";
import styles from "./styles.module.css";

type MainTemplateProps = {
  children: React.ReactNode;
};
export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <div className={styles.wrapper}>
      <Header>
        <Logo />
        <Menu />
      </Header>
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}

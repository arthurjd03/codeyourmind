"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Sun, Moon, Home, Settings, Lightbulb } from "lucide-react";
import { RouterLink } from "../Routerlink";

type AvailableThemes = "light" | "dark";

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: Sun,
    light: Moon,
  };
  const Icon = nextThemeIcon[theme];

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <nav className={styles.menu}>
      <span className={styles.time}>{formatTime(currentTime)}</span>
      <RouterLink
        className={styles.menuLink}
        to="/home"
        aria-label="home"
        title="Inicio"
      >
        <Home size={30} className={styles.toggle} />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        to="/mission"
        aria-label="Nossa missão"
        title="Missão"
      >
        <Lightbulb size={30} className={styles.toggle} />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        to="/settings"
        aria-label="configurações"
        title="Configurações"
      >
        <Settings size={30} className={styles.toggle} />
      </RouterLink>

      <a
        className={styles.menuLink}
        href="#"
        aria-label="Tema"
        title="Tema"
        onClick={handleThemeChange}
      >
        <Icon size={30} className={styles.themeIcon} />
      </a>
    </nav>
  );
}

import styles from "./styles.module.css";
import { MainTemplate } from "../../templates/MainTemplate";
import { useGoals } from "../../contexts/GoalsContext";
import { GoalProgressCard } from "../../components/GoalProgressCard";
import { GOAL_CATEGORIES } from "../../constants";
import { useState } from "react";
import { User, Briefcase, Book } from "lucide-react";
import type { GoalCategory } from "../../models/GoalModel";
import { Border } from "../../components/Border";
import { BackButton } from "../../components/BackButton";

export function ProgressPage() {
  const { goals } = useGoals();

  const [openCategory, setOpenCategory] = useState<GoalCategory | null>(null);

  function toggleCategory(category: GoalCategory) {
    setOpenCategory((prev) => (prev === category ? null : category));
  }

  // 🔥 ÍCONES FORA DO MAP (melhor prática)
  function renderIcon(category: GoalCategory) {
    if (category === "pessoal") return <User size={22} />;
    if (category === "profissional") return <Briefcase size={22} />;
    if (category === "estudos") return <Book size={22} />;
  }

  // 🔥 OTIMIZAÇÃO (evita vários filters)
  const goalsByCategory = goals.reduce(
    (acc, goal) => {
      acc[goal.category].push(goal);
      return acc;
    },
    {
      pessoal: [],
      profissional: [],
      estudos: [],
    } as Record<GoalCategory, typeof goals>,
  );

  // 🔥 RESUMO
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.progress >= 100).length;

  return (
    <MainTemplate>
      <div className={styles.container}>
        <Border>
          <header className={styles.header}>
            <h1>Progresso das Metas</h1>
            <p>
              Cada avanço é uma prova de que você está mais perto do seu
              objetivo.
            </p>
          </header>
        </Border>
        
      <section>
        <BackButton />
      </section>

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <strong>{totalGoals}</strong>
            <span>Total de metas</span>
          </div>

          <div className={styles.summaryItem}>
            <strong>{completedGoals}</strong>
            <span>Concluídas</span>
          </div>

          <div className={styles.summaryItem}>
            <strong>
              {totalGoals > 0
                ? Math.round((completedGoals / totalGoals) * 100)
                : 0}
              %
            </strong>
            <span>Progresso geral</span>
          </div>
        </div>

        {/* CATEGORIAS */}
        {GOAL_CATEGORIES.map((category) => {
          const categoryGoals = goalsByCategory[category];

          if (categoryGoals.length === 0) return null;

          const isOpen = openCategory === category;

          return (
            <div key={category} className={styles.categoryBlock}>
              {/* HEADER DA CATEGORIA */}
              <div
                className={styles.categoryHeader}
                onClick={() => toggleCategory(category)}
              >
                <div className={styles.headerLeft}>
                  <span
                    className={`${styles.arrow} ${
                      isOpen ? styles.arrowOpen : ""
                    }`}
                  >
                    ▶
                  </span>

                  <h2 className={styles.title}>
                    {renderIcon(category)}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h2>
                </div>

                <span>{categoryGoals.length} metas</span>
              </div>

              {/* CARDS */}
              {isOpen && (
                <div className={styles.cards}>
                  {categoryGoals.map((goal) => (
                    <GoalProgressCard key={goal.id} goal={goal} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MainTemplate>
  );
}

import { useState } from "react";
import styles from "./styles.module.css";
import { MainTemplate } from "../../templates/MainTemplate";
import { Border } from "../../components/Border";
import { BackButton } from "../../components/BackButton";

type HabitType = "weekly" | "daily" | "water" | "counter";

type Habit = {
  id: number;
  name: string;
  type: HabitType;
  created: boolean;
};

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const initialHabits: Habit[] = [
  { id: 1, name: "Treinar / Academia", type: "weekly", created: false },
  { id: 2, name: "Beber 2L de água", type: "water", created: false },
  { id: 3, name: "Ler 20 minutos", type: "daily", created: false },
  { id: 4, name: "Revisei metas do dia", type: "daily", created: false },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits);

  const [weeklyProgress, setWeeklyProgress] = useState<
    Record<number, boolean[]>
  >({});

  const [dailyProgress, setDailyProgress] = useState<Record<number, boolean>>(
    {},
  );

  const [waterProgress, setWaterProgress] = useState<boolean[]>(
    Array(4).fill(false),
  );

  function createHabit(id: number) {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, created: true } : h)),
    );

    setWeeklyProgress((prev) => ({
      ...prev,
      [id]: Array(7).fill(false),
    }));
  }

  function toggleWeeklyDay(habitId: number, dayIndex: number) {
    setWeeklyProgress((prev) => {
      const updated = [...(prev[habitId] || Array(7).fill(false))];
      updated[dayIndex] = !updated[dayIndex];

      return { ...prev, [habitId]: updated };
    });
  }

  function toggleDailyHabit(habitId: number) {
    setDailyProgress((prev) => ({
      ...prev,
      [habitId]: !prev[habitId],
    }));
  }

  function toggleWater(index: number) {
    setWaterProgress((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }

  const waterCompleted = waterProgress.every(Boolean);

  return (
    <MainTemplate>
      <main className={styles.container}>
        <Border>
          <header className={styles.header}>
            <h1>Hábitos Diários</h1>
            <p>Pequenas ações todos os dias constroem grandes resultados.</p>
          </header>
        </Border>

      <section>
        <BackButton />
      </section>
      
        <ul className={styles.list}>
          {habits.map((habit) => (
            <li key={habit.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{habit.name}</h3>

                {!habit.created && (
                  <button
                    className={styles.createBtn}
                    onClick={() => createHabit(habit.id)}
                  >
                    Criar hábito
                  </button>
                )}
              </div>

              {habit.created && (
                <div className={styles.progress}>
                  {/* HÁBITO DIÁRIO */}
                  {habit.type === "daily" && (
                    <button
                      className={`${styles.dailyBtn} ${
                        dailyProgress[habit.id] ? styles.completed : ""
                      }`}
                      onClick={() => toggleDailyHabit(habit.id)}
                    >
                      {dailyProgress[habit.id]
                        ? "Concluído hoje"
                        : "Marcar como feito"}
                    </button>
                  )}

                  {/* HÁBITO SEMANAL */}
                  {habit.type === "weekly" && (
                    <div className={styles.week}>
                      {weekDays.map((day, index) => (
                        <label key={day} className={styles.day}>
                          <input
                            type="checkbox"
                            checked={weeklyProgress[habit.id]?.[index] || false}
                            onChange={() => toggleWeeklyDay(habit.id, index)}
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* HÁBITO ÁGUA */}
                  {habit.type === "water" && (
                    <>
                      <p className={styles.waterText}>
                        Meta diária: 2L (
                        {waterCompleted ? "Concluído" : "Em andamento"})
                      </p>

                      <div className={styles.water}>
                        {waterProgress.map((checked, index) => (
                          <label key={index} className={styles.day}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleWater(index)}
                            />
                            500ml
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </MainTemplate>
  );
}

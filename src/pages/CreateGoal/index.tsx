import { useState } from "react";
import styles from "./styles.module.css";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

import { MainTemplate } from "../../templates/MainTemplate";
import { useGoals } from "../../contexts/GoalsContext";
import type { GoalModel, GoalCategory } from "../../models/GoalModel";
import { Border } from "../../components/Border";
import { BackButton } from "../../components/BackButton";
import { getTodayDate } from "../../utils/format";

export function CreateGoal() {
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("pessoal");

  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState("");

  function handleCreateGoal(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !category) {
      toastifyAdapter.error("Preencha o título e a categoria da meta");
      return;
    }

    const newGoal: GoalModel = {
      id: crypto.randomUUID(),
      title,
      category,
      progress: 0,

      daysCompleted: 0,
      startDate: startDate || undefined,
      endDate: endDate || undefined,

      createdAt: new Date().toISOString(),
    };
    addGoal(newGoal);
    toastifyAdapter.success(`Meta: (${title}) criada com sucesso`);

    // limpar campos
    setStartDate(getTodayDate());
    setEndDate("");
    setTitle("");
    setCategory("pessoal");
  }

  return (
    <MainTemplate>
      <div className={styles.container}>
        <Border>
          <header className={styles.header}>
            <h1 className={styles.title}>Criar nova meta</h1>
            <p className={styles.subtitle}>
              Disciplina diária é o caminho para resultados duradouros.
            </p>
          </header>
        </Border>
          <section className={styles.arrow}>
            <BackButton />
          </section>

        <form onSubmit={handleCreateGoal} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title" className={styles.label}>
              Título da meta
            </label>
            <textarea
              id="title"
              name="title"
              className={styles.textarea}
              maxLength={60}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Aprender React avançado"
              rows={2}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="category" className={styles.label}>
              Categoria
            </label>
            <select
              id="category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
            >
              <option value="pessoal">Pessoal</option>
              <option value="profissional">Profissional</option>
              <option value="estudos">Estudos</option>
            </select>
          </div>

          <div className={styles.dateRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Data de início
              </label>
              <input
                id="startDate"
                className={styles.inputDate}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="endDate" className={styles.label}>
                Data final
              </label>
              <input
                id="endDate"
                className={styles.inputDate}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Criar meta
          </button>
        </form>
      </div>
    </MainTemplate>
  );
}

import { useState } from "react";
import styles from "./styles.module.css";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

import { MainTemplate } from "../../templates/MainTemplate";
import { Form } from "../../components/MainForm/Form";
import { FormField } from "../../components/MainForm/FormField";
import { Textarea } from "../../components/MainForm/Textarea";
import { Select } from "../../components/MainForm/Select";
import { useGoals } from "../../contexts/GoalsContext";
import type { GoalModel, GoalCategory } from "../../models/GoalModel";
import { Border } from "../../components/Border";
import { BackButton } from "../../components/BackButton";

export function CreateGoal() {
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("pessoal");

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
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
    setStartDate("");
    setEndDate("");
    addGoal(newGoal);

    toastifyAdapter.success(`Meta: (${title}) criada com sucesso`);

    // limpar campos
    setTitle("");
    setCategory("pessoal");
  }

  return (
    <MainTemplate>
      <div className={styles.container}>
        <Border>
          <header className={styles.header}>
            <h1>Criar nova meta</h1>
            <p>Disciplina diária é o caminho para resultados duradouros.</p>
          </header>
        </Border>
        <section className={styles.arrow}>
          <BackButton />
        </section>
      </div>

      <Form onSubmit={handleCreateGoal}>
        <FormField label="Título da meta" htmlFor="title">
          <Textarea
            id="title"
            name="title"
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Aprender React avançado"
            rows={2}
          />
        </FormField>
        <FormField label="Categoria">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as GoalCategory)}
          >
            <option value="pessoal">Pessoal</option>
            <option value="profissional">Profissional</option>
            <option value="estudos">Estudos</option>
          </Select>
        </FormField>

        <FormField label="Data de início">
          <input
            className="calendar"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormField>

        <FormField label="Data de término">
          <input
            className="calendar"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormField>
        <button type="submit">Criar meta</button>
      </Form>
    </MainTemplate>
  );
}

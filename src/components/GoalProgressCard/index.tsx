import { Check, Trash } from "lucide-react";
import { useGoals } from "../../contexts/GoalsContext";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";
import { ProgressBar } from "../ProgressBar";
import type { GoalModel } from "../../models/GoalModel";
import styles from "./styles.module.css";
import { CATEGORY_COLORS } from "../../constants";
import { ConfirmModal } from "../ConfirmModal";
import { useState } from "react";
import { getTotalDays } from "../../utils/goalDateUtils";

import { TOAST_DURATION } from "../../constants/toast";

type Props = {
  goal: GoalModel;
};

export function GoalProgressCard({ goal }: Props) {
  const { removeGoal, updateGoal } = useGoals();
  const [confirmType, setConfirmType] = useState<"delete" | "complete" | null>(
    null,
  );
  const [isWaiting, setIsWaiting] = useState(false);

  const totalDays =
    goal.startDate && goal.endDate
      ? getTotalDays(goal.startDate, goal.endDate)
      : 0;

  const completedDays = goal.daysCompleted ?? 0;

  const progress =
    totalDays > 0
      ? Math.round((completedDays / totalDays) * 100)
      : goal.progress;

  function handleDayProgress() {
    if (isWaiting) return;

    setIsWaiting(true);

    // ✅ META COM CALENDÁRIO
    if (goal.startDate && goal.endDate) {
      if (completedDays >= totalDays) {
        toastifyAdapter.info("Todos os dias já foram marcados.");
        setTimeout(() => setIsWaiting(false), TOAST_DURATION + 500);
        return;
      }

      const newDays = completedDays + 1;
      const newProgress = Math.round((newDays / totalDays) * 100);

      updateGoal({
        ...goal,
        daysCompleted: newDays,
        progress: newProgress,
      });

      toastifyAdapter.success("Dia registrado!", {
        onClose: () => setIsWaiting(false),
      });
      return;
    }

    // 🔥 META SEM CALENDÁRIO (NOVO COMPORTAMENTO)
    if (goal.progress >= 100) {
      toastifyAdapter.info("Meta já concluída.");
      setTimeout(() => setIsWaiting(false), TOAST_DURATION + 500);
      return;
    }

    const newProgress = Math.min(goal.progress + 10, 100);

    updateGoal({
      ...goal,
      progress: newProgress,
    });

    toastifyAdapter.success("Progresso atualizado!", {
      onClose: () => setIsWaiting(false),
    });
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{goal.title}</h3>
      </div>

      {goal.startDate && goal.endDate && (
        <div className={styles.dateInfo}>
          <span>
            ✔ {completedDays} / {totalDays} dias
          </span>
        </div>
      )}

      <ProgressBar progress={progress} color={CATEGORY_COLORS[goal.category]} />

      <span className={styles.progress}>{progress}% concluído</span>

      <div className={styles.actions}>
        <button
          className={styles.completeBtn}
          onClick={() => setConfirmType("complete")}
        >
          <Check size={16} />
        </button>

        <button
          className={styles.deleteBtn}
          onClick={() => setConfirmType("delete")}
        >
          <Trash size={16} />
        </button>

        <button
          className={styles.progressBtn}
          onClick={handleDayProgress}
          disabled={
            isWaiting ||
            (goal.startDate && goal.endDate
              ? completedDays >= totalDays
              : goal.progress >= 100)
          }
        >
          {isWaiting ? "Aguarde..." : "Marcar dia"}
        </button>
      </div>
      {confirmType && (
        <ConfirmModal
          message={
            confirmType === "delete"
              ? "Tem certeza que deseja excluir esta meta?"
              : "Tem certeza que deseja concluir esta meta?"
          }
          onCancel={() => setConfirmType(null)}
          onConfirm={() => {
            if (confirmType === "delete") {
              removeGoal(goal.id);
              toastifyAdapter.warning(`Meta excluída: ${goal.title}`);
            }

            if (confirmType === "complete") {
              updateGoal({ ...goal, progress: 100 });
              removeGoal(goal.id);
              toastifyAdapter.success(`Meta: ${goal.title} foi concluída.`);
            }

            setConfirmType(null);
          }}
        />
      )}
    </div>
  );
}

import React from "react";

/**
 * Reusable alert banner for displaying validation errors, duplicate email warnings,
 * server error notices, or success messages while matching FoodNest's design aesthetics.
 */
const FormAlert = ({ type = "error", message, onClose }) => {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      role="alert"
      className={`p-3.5 rounded-xl border flex items-start gap-3 text-sm transition-all duration-200 ${
        isError
          ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300"
          : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300"
      }`}
    >
      <span className="text-base flex-shrink-0 leading-none mt-0.5" aria-hidden="true">
        {isError ? "⚠️" : "✅"}
      </span>
      <div className="flex-1 leading-relaxed font-medium">{message}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold ml-1 cursor-pointer transition-colors"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default FormAlert;

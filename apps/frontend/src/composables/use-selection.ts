import { ref, computed } from "vue";

export type SelectedPoint = { x: number; y: number };

export type Selection = {
  start: SelectedPoint;
  end: SelectedPoint;
};

export type OnConfirmSelectionFunction = (
  start: SelectedPoint,
  end: SelectedPoint,
  logicalOperation: SelectionMode,
) => void;

export type SelectionMode = "add" | "subtract";

export type UseSelectionArgs = {
  OnConfirm?: OnConfirmSelectionFunction;
};

export function useSelection(args?: UseSelectionArgs) {
  const selectionMode = ref<SelectionMode>("add");
  const selectionBegin = ref<SelectedPoint | null>(null);
  const selectionEnd = ref<SelectedPoint | null>(null);
  const isSelecting = computed(
    () => selectionBegin.value !== null && selectionEnd.value !== null,
  );

  const selection = computed<Selection | null>(() => {
    if (!selectionBegin.value || !selectionEnd.value) return null;

    const begin = selectionBegin.value;
    const end = selectionEnd.value;

    return {
      start: { x: Math.min(begin.x, end.x), y: Math.min(begin.y, end.y) },
      end: { x: Math.max(begin.x, end.x), y: Math.max(begin.y, end.y) },
    };
  });

  const isInSelection = (x: number, y: number) => {
    if (!selection.value) return false;
    const { start, end } = selection.value;

    return x >= start.x && x <= end.x && y >= start.y && y <= end.y;
  };

  const startSelection = (x: number, y: number, mode: SelectionMode) => {
    if (x < 0 || y < 0) return;
    selectionBegin.value = { x, y };
    selectionEnd.value = { x, y };
    selectionMode.value = mode;
  };

  const completeSelection = () => {
    if (!selection.value) return;

    const { start, end } = selection.value;

    if (args && args.OnConfirm) {
      args.OnConfirm(start, end, selectionMode.value);
    }

    selectionBegin.value = null;
    selectionEnd.value = null;
  };

  const updateSelectionEnd = (x: number, y: number) => {
    if (!selectionBegin.value) return;
    selectionEnd.value = { x, y };
  };

  const cancelSelection = () => {
    selectionBegin.value = null;
    selectionEnd.value = null;
  };

  return {
    selection,
    selectionMode,
    isSelecting,
    isInSelection,
    startSelection,
    completeSelection,
    updateSelectionEnd,
    cancelSelection,
  };
}

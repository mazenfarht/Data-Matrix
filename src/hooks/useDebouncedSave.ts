import { useMemo } from "react";
import { debounce } from "../utils/debounce";
import type { Attendee } from "../types/attendee";

const SAVE_DELAY_MS = 600;

export function useDebouncedSave() {
  const debouncedSave = useMemo(
    () =>
      debounce((attendee: Attendee) => {
        console.log(`Saving attendee #${attendee.id}...`, attendee);

        setTimeout(() => {
          console.log(`Saved attendee #${attendee.id} successfully.`);
        }, 300);
      }, SAVE_DELAY_MS),
    []
  );

  return debouncedSave;
}

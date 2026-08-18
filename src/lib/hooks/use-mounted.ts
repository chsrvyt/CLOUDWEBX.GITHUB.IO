"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/** True only after the client has mounted — same useSyncExternalStore
 *  trick as use-is-touch-device/use-reduced-motion, so gating a
 *  client-only mount (e.g. an R3F Canvas) doesn't need a setState-in-effect
 *  that the react-hooks/set-state-in-effect rule flags. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

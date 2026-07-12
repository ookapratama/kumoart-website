"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** true hanya setelah hydration di client — pengganti pola setMounted-di-effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

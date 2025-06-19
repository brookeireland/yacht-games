import { useEffect } from "react";

export function useAsyncEffect(fn: () => Promise<void>, deps: any[]): void {
  useEffect(() => {
    fn().catch((e) => {
      console.error(e);
    });
  }, deps);
}
//todo
//handle effect cancellation

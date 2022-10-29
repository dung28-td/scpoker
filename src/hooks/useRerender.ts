import { useReducer } from "react";

export default function useRerender() {
  const [, rerender] = useReducer(s => s + 1, 0)
  return rerender
}
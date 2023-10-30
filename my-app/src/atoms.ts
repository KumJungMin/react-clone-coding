import { atom, selector } from "recoil";

interface todoState {
  [key: string]: string[];
}

export const toDoState = atom<todoState>({
  key: "toDos",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  }
});
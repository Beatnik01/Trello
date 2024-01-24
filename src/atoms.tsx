import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

interface IboardState {
  [key: string]: IToDo[];
}

// =========================================
// recoil-persist, localStorage 저장용.
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});
// =========================================

export const toggleMode = atom<boolean>({
  key: "mode",
  default: true,
});

export const categoryState = atom<string>({
  key: "category",
  default: "To Do",
});

export const toDoState = atom<IboardState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [persistAtom],
});

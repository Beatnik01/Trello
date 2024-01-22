import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
}

interface IboardState {
  [key: string]: IToDo[];
}

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const toggleMode = atom<boolean>({
  key: "mode",
  default: false,
});

export const categories = atom<string[]>({
  key: "categories",
  default: ["To Do", "Doing", "Done"],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const boardState = atom<IboardState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

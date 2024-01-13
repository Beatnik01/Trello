import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
// enum은 기본적으로 0,1,2와 같은 숫자로 저장되기 때문에 문자열로 쓸거면 따로 값을 넣어줘

export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedToDos = localStorage.getItem(key);
    if (savedToDos !== null) {
      setSelf(JSON.parse(savedToDos));
    }
    onSet((toDos: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(toDos));
    });
  };

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDos")],
});

export const toDoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

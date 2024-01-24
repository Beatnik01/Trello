import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../../atoms";

const CategoryBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 30px;
  gap: 5px;
  overflow: hidden;
  max-height: 30px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    height: 25px;
    border-radius: 8px;
    border: none;
    padding: 5px;
    background-color: white;
    box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
    border: 2px solid transparent;
    cursor: pointer;
    &.selected {
      background-color: ${(props) => props.theme.bgColor};
      color: white;
    }
  }
`;

function Category() {
  const toDos = useRecoilValue(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.innerText);
  };
  return (
    <CategoryBtns>
      {Object.keys(toDos).map((toDoId) => (
        <button
          key={toDoId}
          onClick={onClickCategory}
          className={category === toDoId ? "selected" : ""}
        >
          {toDoId}
        </button>
      ))}
    </CategoryBtns>
  );
}

export default Category;

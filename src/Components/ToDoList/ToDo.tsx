import styled from "styled-components";
import { IToDo } from "../../atoms";

interface IToDoProps {
  toDos: IToDo[];
  toDoId: string;
}

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Todo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.cardColor};
  padding: 5px 10px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  border: 2px solid transparent;
  border-radius: 8px;
  margin-bottom: 5px;
  min-height: 36px;
  &:hover {
    border: 2px solid ${(props) => props.theme.bgColor};
    box-shadow: none;
  }
  span:first-child {
    overflow-wrap: anywhere;
  }
  span:last-child {
    position: absolute;
    right: 10px;
  }
`;

function ToDo({ toDos }: IToDoProps) {
  return (
    <TodoList>
      {toDos.map((toDo) => (
        <Todo key={toDo.id}>{toDo.text}</Todo>
      ))}
    </TodoList>
  );
}

export default ToDo;

import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, categoryState, toDoState } from "../atoms";
import styled from "styled-components";
import { useState } from "react";

interface IToDoProps {
  toDos: IToDo[];
  toDoId: string;
}

const Wrapper = styled.div`
  width: 270px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 50px;
`;

const TitleText = styled.h2`
  text-align: center !important;
  font-weight: 800;
  font-size: 23px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  padding: 5px 10px;
  border: 2px solid transparent;
  border-radius: 8px;
`;

const TitleBtn = styled.button`
  border-radius: 10px;
  border: none;
  width: 30px;
  height: 30px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 121, 191, 0.1);
  }
  &:active {
    background-color: rgba(0, 121, 191, 0.5);
  }
`;

const Form = styled.form`
  padding: 0px 20px;
  padding-bottom: 10px;
  input {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 10px;
    box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
    border: 2px solid transparent;
    border-radius: 8px;
    min-height: 36px;
    width: 100%;
    &:hover {
      border: 2px solid ${(props) => props.theme.bgColor};
      box-shadow: none;
    }
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  border: 2px solid transparent;
  min-height: 36px;
`;

const CategoryBtns = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  gap: 5px;
  overflow: hidden;
  max-height: 30px;
  button {
    border-radius: 8px;
    border: none;
    padding: 5px;
    background-color: white;
    box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
    border: 2px solid transparent;
    cursor: pointer;
  }
`;

const CategoryAdd = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  button {
    background-color: ${(props) => props.theme.bgColor};
    min-width: 10px;
    min-height: 10px;
    color: white;
    border: none;
    border-radius: 50%;
  }
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
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

const Hr = styled.hr`
  width: 90%;
`;

function ToDoList({ toDos, toDoId }: IToDoProps) {
  const [toDosArr, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const setCategory = useSetRecoilState(categoryState);
  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const [isCategoryInputActive, setIsCategoryInputActive] = useState(false);
  const onValid = ({ toDo }: any) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
      category: toDoId,
    };
    setToDos((allToDos) => {
      return {
        ...allToDos,
        [toDoId]: [...allToDos[toDoId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const addCategory = ({ toDoId }: any) => {
    console.log(toDoId);
    setToDos((allToDos) => {
      return {
        ...allToDos,
        [toDoId]: [],
      };
    });
    setValue("toDoId", "");
  };
  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.innerText);
  };
  const handleTitleTextClick = () => {
    setIsCategoryVisible(!isCategoryVisible);
    setIsCategoryInputActive(true);
  };
  const handleInputBlur = () => {
    setIsCategoryVisible(true);
    setIsCategoryInputActive(false);
  };
  return (
    <Wrapper>
      <Title>
        <TitleBtn></TitleBtn>
        <TitleText>{toDoId}</TitleText>
        <TitleBtn>
          <span>•••</span>
        </TitleBtn>
      </Title>
      {isCategoryVisible ? (
        <CategoryContainer>
          <CategoryBtns>
            {Object.keys(toDosArr).map((toDoId) => (
              <button key={toDoId} onClick={onClickCategory}>
                {toDoId}
              </button>
            ))}
          </CategoryBtns>
          <CategoryAdd>
            <button onClick={handleTitleTextClick}>+</button>
          </CategoryAdd>
        </CategoryContainer>
      ) : (
        <Form onSubmit={handleSubmit(addCategory)}>
          <input
            {...register("toDoId", {})}
            onBlur={handleInputBlur}
            autoFocus={isCategoryInputActive}
            placeholder="Write a category"
          />
        </Form>
      )}
      <Hr />
      <TodoList>
        {toDos.map((toDo) => (
          <Todo key={toDo.id}>{toDo.text}</Todo>
        ))}
      </TodoList>
      <Hr />
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {})} placeholder="Write a to do" />
      </Form>
    </Wrapper>
  );
}

export default ToDoList;

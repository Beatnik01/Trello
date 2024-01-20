import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

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
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 8px;
`;

const TitleInput = styled.input`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  padding: 5px 10px;
  border-radius: 8px;
  font-family: "Source Sans Pro", sans-serif;
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

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver ? "#dfe6e9" : props.$isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 0px 20px;
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
    margin-bottom: 5px;
    min-height: 36px;
    width: 100%;
    &:hover {
      border: 2px solid ${(props) => props.theme.bgColor};
      box-shadow: none;
    }
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const [isTitleTextVisible, setIsTitleTextVisible] = useState(true);
  const handleTitleTextClick = () => {
    setIsTitleTextVisible(!isTitleTextVisible);
  };
  return (
    <Wrapper>
      <Title>
        {isTitleTextVisible ? (
          <>
            <TitleText onClick={handleTitleTextClick}>{boardId}</TitleText>
            <TitleBtn>
              <span>•••</span>
            </TitleBtn>
          </>
        ) : (
          <>
            <TitleInput type="text" value={boardId} />
          </>
        )}
      </Title>
      <Droppable droppableId={boardId}>
        {(provided, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
    </Wrapper>
  );
}

export default Board;
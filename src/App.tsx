import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState, toggleMode } from "./atoms";
import Board from "./Components/Board/Board";
import ToDo from "./Components/ToDoList/ToDoList";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const ToDos = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.divColor};
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [mode, setMode] = useRecoilState(toggleMode);
  const category = useRecoilValue(categoryState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement.
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  const toggleModeAtom = () => {
    setMode((prev) => !prev);
  };
  return (
    <>
      {mode ? (
        <>
          <ToggleButton onClick={toggleModeAtom}>Click</ToggleButton>
          <Wrapper>
            <ToDos>
              {Object.keys(toDos)
                .filter((toDoId) => toDoId === category)
                .map((toDoId) => (
                  <ToDo key={toDoId} toDoId={toDoId} toDos={toDos[toDoId]} />
                ))}
            </ToDos>
          </Wrapper>
        </>
      ) : (
        <>
          <ToggleButton onClick={toggleModeAtom}>Click</ToggleButton>
          <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
              <Boards>
                {Object.keys(toDos).map((boardId) => (
                  <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                ))}
              </Boards>
            </Wrapper>
          </DragDropContext>
        </>
      )}
    </>
  );
}

export default App;

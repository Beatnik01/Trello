import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<ICardProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => (props.$isDropAnimating ? "#4fc775" : props.theme.cardColor)};
  opacity: ${(props) => (props.$isDragging ? 0.6 : 1)};
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

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface ICardProps {
  $isDragging: boolean;
  $isDropAnimating: boolean;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, info) => (
        <Card
          $isDragging={info.isDragging}
          $isDropAnimating={info.isDropAnimating}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <span>{toDoText}</span>
          <span>✎</span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
// React.memo → prop이 변하지 않으면 렌더링 하지 않게함.

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categories } from "../atoms";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categories = styled.div`
  display: flex;
  gap: 10px;
`;

const Category = styled.div`
  padding: 10px;
  background-color: red;
  border-radius: 8px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 50px;
`;

function ToDo() {
  const category = useRecoilValue(categories);
  return (
    <Wrapper>
      <Categories>
        {category.map((category, key) => (
          <Category key={key}>{category}</Category>
        ))}
      </Categories>
      <Title>dd</Title>
    </Wrapper>
  );
}
export default ToDo;

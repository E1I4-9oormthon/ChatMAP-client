import styled from 'styled-components'
import { BiArrowBack } from 'react-icons/bi'

export const Header = () => {
  return (
    <Wrapper>
      {/* <BackArrow>
        <BiArrowBack size={16} />
      </BackArrow> */}
      <Title>너가올레내가갈레</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 390px;
  height: 44px;
  /* background-color: aliceblue; */
  display: flex;
  align-items: center;
  justify-content: center;
`
const BackArrow = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 350px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 111px;
  height: 33px;
  font-size: 16px;
  font-weight: bold;
`

import styled from 'styled-components'
import { BiArrowBack } from 'react-icons/bi'
import { theme } from '../../styles/theme'

export const Header = () => {
  return (
    <Wrapper>
      {/* <BackArrow>
        <BiArrowBack size={16} />
      </BackArrow> */}
      <Title>너가올레? 내가갈레!</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: ${theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.color.lightGrey};
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
  font-size: 18px;
  font-weight: 700;
`

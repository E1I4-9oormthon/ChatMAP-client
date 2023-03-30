import styled from 'styled-components'
import TitleImg from '../assets/images/title_img.png'

export const WelcomePage = () => {
  return (
    <Wrapper>
      <A>
        <B src={TitleImg} />
        <div>
          <C>시작하기</C>
          <D>안전한 동행을 위해 성별을 정확하게 입력해주세요!</D>
        </div>
      </A>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 2rem;
`

const A = styled.div`
  background: green;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const B = styled.img`
  width: 50%;
`

const C = styled.div`
  background: blue;
`

const D = styled.div`
  color: grey;
`

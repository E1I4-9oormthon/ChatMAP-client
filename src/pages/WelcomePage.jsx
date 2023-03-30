import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import TitleImg from '../assets/images/title_img.png'
import { Button } from '../components/common/Button'
import { theme } from '../styles/theme'

export const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <Main>
      <Section>
        <Wrapper>
          <Box>
            <TitleImage src={TitleImg} />
            <StartButtonWrapper>
              <Button
                name="시작하기"
                handleClick={() => navigate('/favorite_select')}
                isActivated={true}
              />
              <InfoText>
                안전한 동행을 위해 성별을 정확하게 입력해주세요!
              </InfoText>
            </StartButtonWrapper>
          </Box>
        </Wrapper>
      </Section>
    </Main>
  )
}
const Main = styled.div`
  background: ${theme.color.white};
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Section = styled.section`
  width: 100%;
  max-width: 500px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 2rem;
`

const Box = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const TitleImage = styled.img`
  width: 50%;
`

const StartButtonWrapper = styled.div`
  width: 100%;
`

const InfoText = styled.div`
  color: grey;
  text-align: center;
  font-size: 13px;
  margin-top: 1rem;
`

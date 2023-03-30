import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../apis/api'
import TitleImg from '../assets/images/title_img.png'
import { Button } from '../components/common/Button'
import { theme } from '../styles/theme'
import axios from 'axios'

export const WelcomePage = () => {
  const navigate = useNavigate()

  const handleStartClick = () => {
    const loginResult = api.post(`/auth`).then((res) => {
      let sessionStorageLogin = sessionStorage
      sessionStorageLogin.setItem('accesstoken', 'Bearer ' + res.data.data)
      api
        .get(`/users/me`, {
          headers: {
            Authorization: 'Bearer ' + res.data.data,
          },
        })
        .then((res) => {
          if (!res.data.data.favorite) {
            navigate('/favorite_select')
          } else {
            navigate('/main')
          }
        })
    })
  }

  return (
    <Main>
      <Section>
        <Wrapper>
          <Box>
            <TitleImage src={TitleImg} />
            <StartButtonWrapper>
              <Button
                name="시작하기"
                handleClick={() => handleStartClick()}
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

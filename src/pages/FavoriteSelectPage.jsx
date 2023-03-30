import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../apis/api'
import { Button } from '../components/common/Button'
import { Header } from '../components/layouts/Header'
import { theme } from '../styles/theme'

export const FavoriteSelectPage = () => {
  const [favorite, setFavorite] = useState(100)
  const navigate = useNavigate()

  const handleFavoriteButtonClick = (buttonName) => {
    if (favorite === buttonName) {
      setFavorite(100)
    } else {
      setFavorite(buttonName)
    }
  }

  const handleSubmitButtonClick = async () => {
    await api.put(
      `/users`,
      { favorite: favorite },
      { headers: { Authorization: sessionStorage.getItem('accesstoken') } }
    )

    navigate('/main')
  }

  return (
    <Main>
      <Header />
      <Section>
        <Wrapper>
          <Box>
            <FavoriteSelectTitle>어떤 동행을 선호하세요?</FavoriteSelectTitle>
            <FavoriteButton
              onClick={() => handleFavoriteButtonClick(0)}
              isSelected={favorite === 0}
            >
              혼자서 안전하게
            </FavoriteButton>
            <FavoriteButton
              onClick={() => handleFavoriteButtonClick(1)}
              isSelected={favorite === 1}
            >
              말동무와 도란도란
            </FavoriteButton>
          </Box>
          <SubmitButtonWrapper>
            <Button
              name="완료"
              isActivated={favorite < 90}
              handleClick={() => handleSubmitButtonClick()}
            />
          </SubmitButtonWrapper>
        </Wrapper>
      </Section>
    </Main>
  )
}

const Main = styled.div`
  background: ${theme.color.white};
  width: 100%;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Section = styled.section`
  width: 100%;
  max-width: 500px;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 1rem 1rem 2.5rem;
  box-sizing: border-box;
`

const Box = styled.div`
  width: 100%;
`

const FavoriteSelectTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 0.5rem 0;
`

const SubmitButtonWrapper = styled.div`
  width: 90%;
`

const FavoriteButton = styled.div`
  border: 2px solid ${theme.color.grey};
  color: ${theme.color.grey};
  &:hover {
    border: 2px solid ${theme.color.primary} !important;
    font-weight: 700;
    cursor: pointer;
  }
  ${({ isSelected }) =>
    isSelected &&
    `    
    border: 2px solid ${theme.color.primary} !important;
    font-weight: 700;
`}

  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0 0;
`

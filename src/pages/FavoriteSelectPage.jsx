import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/common/Button'
import { theme } from '../styles/theme'

export const FavoriteSelectPage = () => {
  const [favorite, setFavorite] = useState('')

  const handleFavoriteButtonClick = (buttonName) => {
    if (favorite === buttonName) {
      setFavorite('')
    } else {
      setFavorite(buttonName)
    }
  }
  return (
    <Wrapper>
      <Box>
        <FavoriteSelectTitle>어떤 동행을 선호하세요?</FavoriteSelectTitle>
        <FavoriteButton
          onClick={() => handleFavoriteButtonClick('alone')}
          isSelected={favorite === 'alone'}
        >
          혼자서 안전하게
        </FavoriteButton>
        <FavoriteButton
          onClick={() => handleFavoriteButtonClick('together')}
          isSelected={favorite === 'together'}
        >
          말동무와 도란도란
        </FavoriteButton>
      </Box>
      <SubmitButtonWrapper>
        <Button name="완료" isActivated={favorite.length > 0} />
      </SubmitButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem 1rem;
  box-sizing: border-box;
`

const Box = styled.div`
  width: 100%;
`

const FavoriteSelectTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 1rem 0 0.5rem;
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
  width: 100%;
  ${({ isSelected }) =>
    isSelected &&
    `    
    border: 2px solid ${theme.color.primary} !important;
    font-weight: 700;
`}

  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0 0;
`

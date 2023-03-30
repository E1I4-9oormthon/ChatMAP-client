import styled from 'styled-components'
import TitleImg from '../assets/images/title_img.png'
import { theme } from '../styles/theme'

export const FavoriteSelectPage = () => {
  return (
    <Wrapper>
      <Box>
        <FavoriteSelectTitle>어떤 동행을 선호하세요?</FavoriteSelectTitle>
        <FavoriteButton>혼자서 안전하게</FavoriteButton>
        <FavoriteButton>말동무와 도란도란</FavoriteButton>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  padding: 0 1rem 0;
`
const Box = styled.div``

const FavoriteSelectTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 1rem 0 0.5rem;
`

const FavoriteButton = styled.div`
  border: 2px solid ${theme.color.grey};
  color: ${theme.color.grey};
  &:hover {
    border: 2px solid ${theme.color.primary} !important;
    font-weight: 700;
    cursor: pointer;
  }

  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0 0;
`

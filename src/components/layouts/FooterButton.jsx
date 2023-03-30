import styled, { css } from 'styled-components'

export const FooterButton = ({ children, text, color, handleClick }) => {
  return (
    <ButtonWrap onClick={handleClick}>
      <HomeButton>
        <ButtonIcon>{children}</ButtonIcon>
        <ButtomText color={color}>{text}</ButtomText>
      </HomeButton>
    </ButtonWrap>
  )
}

const ButtonWrap = styled.div`
  cursor: pointer;
  width: 58px;
  height: 55px;
`

const HomeButton = styled.div``

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
  height: 25px;
`

const ButtomText = styled.div`
  ${({ color }) => {
    return css`
      display: flex;
      justify-content: center;
      color: ${color};
      font-size: 13px;
    `
  }}
`

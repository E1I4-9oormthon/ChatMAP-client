import React, { memo } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Button = memo(({ handleClick, name, isActivated }) => {
  return (
    <ButtonBox onClick={handleClick} isActivated={isActivated}>
      {name}
    </ButtonBox>
  )
})

const ButtonBox = styled.div`
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s ease;
  color: ${theme.color.white};
  background: ${theme.color.primary};
  ${({ isActivated }) =>
    isActivated &&
    `    
  &:hover {
    cursor: pointer;
  }
`}
  ${({ isActivated }) =>
    !isActivated &&
    `    
    background: ${theme.color.grey} !important;
`}
`

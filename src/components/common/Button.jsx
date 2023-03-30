import React, { memo } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Button = memo(({ handleClick, name }) => {
  return <ButtonBox onClick={handleClick}>{name}</ButtonBox>
})

const ButtonBox = styled.div`
  background: ${theme.color.tertiary};
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  color: ${theme.color.white};
  cursor: pointer;
  &:hover {
    background: ${theme.color.primary};
  }
`

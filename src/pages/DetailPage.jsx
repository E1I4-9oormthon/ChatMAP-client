import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'

export const DetailPage = () => {
  return <Wrapper>DETAIL</Wrapper>
}
const Tab = styled.button`
  cursor: pointer;
  width: 50%;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    font-weight: 700;
    border-bottom: 2px solid ${theme.color.primary};
  `}
`
const TabBox = styled.div`
  display: flex;
  width: 100%;
`
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Wrapper = styled.div`
  background: ${theme.color.lightGrey};
  height: calc(100% - 2rem);
  padding: 1rem;
  overflow: scroll;
  word-break: break-all;
`

const SuggestBox = styled.div`
  margin: 1rem 0;
  background: ${theme.color.white};
  border: 1px solid ${theme.color.grey};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`
const ContentsWrapper = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`
const UserName = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`
const UserFavoriteGender = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: space-between;
`

const PostListBottom = styled.div`
  ${({ continueFetching }) =>
    !continueFetching &&
    `
    display: none !important;
  `}
`

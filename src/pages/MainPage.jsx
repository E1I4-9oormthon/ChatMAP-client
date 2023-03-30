import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'
import api from '../apis/api'

export const MainPage = () => {
  const intersectRef = useRef(null)
  const rootRef = useRef(null)
  const [isIntersect, setIsIntersect] = useState(false)

  const [postList, setPostList] = useState([])
  const [postListPage, setPostListPage] = useState(0)
  const [continueFetching, setContinueFetching] = useState(true)
  const navigate = useNavigate()

  const COUNT = 10

  useEffect(() => {
    if (!rootRef.current) return
    const observer = new IntersectionObserver(handleIntersect, {
      root: rootRef.current,
      rootMargin: '0px',
      threshold: 0.01,
    })

    if (intersectRef.current) observer.observe(intersectRef.current)

    return () => observer.disconnect()
  }, [intersectRef, rootRef.current])

  const handleIntersect = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setIsIntersect(true)
    } else {
      setIsIntersect(false)
    }
  }
  const mock = [
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 1,
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 2,
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 3,
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 4,
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 5,
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
      postId: 6,
    },
  ]

  const fetchPostList = async () => {
    try {
      let fetchedData = await api.get(`/olles`)
      fetchedData = fetchedData.data.data.olles
      if (fetchedData.length === 0) {
        setContinueFetching(false)
        return
      }
      setPostList((prev) => [...prev, ...fetchedData])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPostList()
  }, [postListPage])

  useEffect(() => {
    if (isIntersect && postList.length && postListPage >= 0) {
      setPostListPage((prev) => {
        return prev + COUNT
      })
    }
  }, [isIntersect])

  return (
    <Wrapper ref={rootRef}>
      {postList.map((data, index) => (
        <SuggestBox
          key={index}
          onClick={() => navigate(`/detail_page/${data.id}`)}
        >
          <ProfileImage src={data.user.profileImage} />
          <ContentsWrapper>
            <UserName>{data.user.name}</UserName>
            <UserFavoriteGender>
              <div>
                {data.favoriteGender === 2 ? '여성분' : '남성분'}과 동행할래요
              </div>
              <div>{data.startDate}</div>
            </UserFavoriteGender>
          </ContentsWrapper>
        </SuggestBox>
      ))}
      <PostListBottom continueFetching={continueFetching} ref={intersectRef}>
        loading
      </PostListBottom>
    </Wrapper>
  )
}

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

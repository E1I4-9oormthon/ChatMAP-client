import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import api from '../apis/api'
import TitleImg from '../assets/images/title_img.png'

export const MainPage = () => {
  const intersectRef = useRef(null)
  const rootRef = useRef(null)
  const [isIntersect, setIsIntersect] = useState(false)

  const [postList, setPostList] = useState([])
  const [postListPage, setPostListPage] = useState(1)
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

  const fetchPostList = async () => {
    try {
      let fetchedData = await api.get(
        `/olles?page=${postListPage}&take=${COUNT}`
      )
      const hasNextPage = fetchedData.data.data.meta.hasNextPage
      fetchedData = fetchedData.data.data.olles
      if (!hasNextPage) {
        setContinueFetching(false)
        return
      }
      setPostList((prev) => [...prev, ...fetchedData])
    } catch (err) {
      console.log(err)
    }
  }

  const handleDetailPage = async (id) => {
    console.log(id)
    await api
      .get(`/olles/${id}`)
      .then((res) => {
        console.log(res)
        navigate(`/detail_page/${id}`)
      })
      .catch((err) => {
        console.log('정보 불러오기 실패')
      })
  }

  useEffect(() => {
    fetchPostList()
  }, [postListPage])

  useEffect(() => {
    if (isIntersect && postList.length && postListPage >= 0) {
      setPostListPage((prev) => {
        return prev + 1
      })
    }
  }, [isIntersect])

  return (
    <Wrapper ref={rootRef}>
      {postList &&
        postList.map((data, index) => (
          <SuggestBox key={index} onClick={() => handleDetailPage(data.id)}>
            <ProfileImage src={TitleImg} />
            <ContentsWrapper>
              <Title>{data.title}</Title>
              <UserName>{data.user.name}</UserName>
              <UserFavoriteGender>
                <div>
                  {data.favoriteGender === 2 ? '여성분' : '남성분'}과 동행할래요
                </div>
                <div>{data.startDate.split('T')[0]}</div>
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
  overflow: auto;
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
  cursor: pointer;
`

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 5px;
`
const ContentsWrapper = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const UserName = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${theme.color.grey};
`

const UserFavoriteGender = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  color: ${theme.color.grey};
`

const PostListBottom = styled.div`
  ${({ continueFetching }) =>
    !continueFetching &&
    `
    display: none !important;
  `}
`

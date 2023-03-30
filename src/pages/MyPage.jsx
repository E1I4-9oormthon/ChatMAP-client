import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'

export const MyPage = () => {
  const tabTitles = ['내가 작성한 제안서', '나의 동행']

  const intersectRef = useRef(null)
  const rootRef = useRef(null)
  const [isIntersect, setIsIntersect] = useState(false)

  const [postList, setPostList] = useState([])
  const [postListPage, setPostListPage] = useState(0)
  const [continueFetching, setContinueFetching] = useState(true)
  const [active, setActive] = useState(tabTitles[0])
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
  const mock1 = [
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

  const mock2 = [
    {
      profileImage: TitleImg,
      userName: 'aaaa',
      favoriteGender: 'f',
      visitDate: '2023.03.31',
      postId: 7,
    },
    {
      profileImage: TitleImg,
      userName: 'aaaa',
      favoriteGender: 'f',
      visitDate: '2023.03.31',
      postId: 8,
    },
    {
      profileImage: TitleImg,
      userName: 'aaaa',
      favoriteGender: 'f',
      visitDate: '2023.03.31',
      postId: 9,
    },
    {
      profileImage: TitleImg,
      userName: 'aaaa',
      favoriteGender: 'f',
      visitDate: '2023.03.31',
      postId: 10,
    },
    {
      profileImage: TitleImg,
      userName: 'aaaa',
      favoriteGender: 'f',
      visitDate: '2023.03.31',
      postId: 11,
    },
  ]

  const fetchPostList = async (active) => {
    try {
      let fetchedData

      if (active === '내가 작성한 제안서') {
        fetchedData = mock1
      } else {
        fetchedData = mock2
      }
      if (fetchedData.length === 0) {
        setContinueFetching(false)
        return
      }
      setPostList((prev) => [...prev, ...fetchedData])
    } catch (err) {
      console.log(err)
    }
  }

  const handleTabClick = (title) => {
    setActive(title)
    setPostList([])
    setPostListPage(0)
    setContinueFetching(true)
    fetchPostList()
  }

  useEffect(() => {
    fetchPostList(active)
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
      <TabContainer>
        <TabBox>
          {tabTitles.map((title) => (
            <Tab
              key={title}
              active={active === title}
              onClick={() => handleTabClick(title)}
            >
              {title}
            </Tab>
          ))}
        </TabBox>
      </TabContainer>

      {active === '내가 작성한 제안서' ? (
        <div>
          {postList.map((data, index) => (
            <SuggestBox
              key={index}
              onClick={() => navigate(`/detail_page/${data.postId}`)}
            >
              <ProfileImage src={data.profileImage} />
              <ContentsWrapper>
                <UserName>{data.userName}</UserName>
                <UserFavoriteGender>
                  <div>
                    {data.favoriteGender === 'f' ? '여성분' : '남성분'}과
                    동행할래요
                  </div>
                  <div>{data.visitDate}</div>
                </UserFavoriteGender>
              </ContentsWrapper>
            </SuggestBox>
          ))}
          <PostListBottom
            continueFetching={continueFetching}
            ref={intersectRef}
          >
            loading
          </PostListBottom>
        </div>
      ) : (
        <div>
          {postList.map((data, index) => (
            <SuggestBox
              key={index}
              onClick={() => navigate(`/detail_page/${data.postId}`)}
            >
              <ProfileImage src={data.profileImage} />
              <ContentsWrapper>
                <UserName>{data.userName}</UserName>
                <UserFavoriteGender>
                  <div>
                    {data.favoriteGender === 'f' ? '여성분' : '남성분'}과
                    동행할래요
                  </div>
                  <div>{data.visitDate}</div>
                </UserFavoriteGender>
              </ContentsWrapper>
            </SuggestBox>
          ))}
          <PostListBottom
            continueFetching={continueFetching}
            ref={intersectRef}
          >
            loading
          </PostListBottom>
        </div>
      )}
    </Wrapper>
  )
}
const Tab = styled.button`
  cursor: pointer;
  width: 50%;
  border: 0;
  outline: 0;
  font-size: 15px;
  padding: 1rem;
  ${({ active }) =>
    active &&
    `
    font-weight: 700;
    border-bottom: 2px solid ${theme.color.primary};
  `};
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

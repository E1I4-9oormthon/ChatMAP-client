import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'
import api from '../apis/api'

export const MyPage = () => {
  const tabTitles = ['내가 작성한 제안서', '나의 동행']
  const [postList, setPostList] = useState([])
  const [active, setActive] = useState(tabTitles[0])
  const navigate = useNavigate()

  const COUNT = 10

  const fetchPostList = async (active) => {
    try {
      let fetchedData = await api.get(`/users/me`, {
        headers: {
          Authorization: sessionStorage.getItem('accesstoken'),
        },
      })

      if (active === '내가 작성한 제안서') {
        setPostList(fetchedData.data.data.olles)
      } else {
        setPostList(fetchedData.data.data.applies)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTabClick = (title) => {
    setActive(title)
  }

  useEffect(() => {
    fetchPostList(active)
  }, [active])

  return (
    <Wrapper>
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
          {postList &&
            postList.map((data, index) => (
              <SuggestBox
                key={index}
                onClick={() => navigate(`/detail_page/${data.postId}`)}
              >
                <ProfileImage src={TitleImg} />
                <ContentsWrapper>
                  <UserName>{data.userName}</UserName>

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
        </div>
      ) : (
        <div>
          {postList &&
            postList.map((data, index) => (
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

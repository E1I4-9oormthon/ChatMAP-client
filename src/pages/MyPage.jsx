import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'
import api from '../apis/api'

export const MyPage = () => {
  const tabTitles = ['내가 작성한 제안서', '나의 동행']
  const [postList, setPostList] = useState([])
  const [signedInUser, setSignedInUser] = useState()
  const [active, setActive] = useState(tabTitles[0])
  const navigate = useNavigate()

  const COUNT = 10

  const fetchPostList = async (active) => {
    try {
      let fetchedData
      if (active === '내가 작성한 제안서') {
        fetchedData = await api.get(`/users/me/olles`, {
          headers: {
            Authorization: sessionStorage.getItem('accesstoken'),
          },
        })
      } else {
        fetchedData = await api.get(`/users/me/applies`, {
          headers: {
            Authorization: sessionStorage.getItem('accesstoken'),
          },
        })
      }
      setPostList(fetchedData.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSignedInData = async () => {
    try {
      let fetchedData = await api.get(`/users/me`, {
        headers: {
          Authorization: sessionStorage.getItem('accesstoken'),
        },
      })
      setSignedInUser(fetchedData.data.data)
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

  useEffect(() => {
    fetchSignedInData()
  }, [])

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
                onClick={() => navigate(`/detail_page/${data.id}`)}
              >
                <ProfileImage src={TitleImg} />
                <ContentsWrapper>
                  <TopInfoWrapper>
                    <div> {data.title}</div>
                    {data.status === 0 ? (
                      <WaitingTextWrapper>
                        <WaitingText>대기중</WaitingText>
                        {data.applies.length ? (
                          <ApplyNumber>{data.applies.length}+</ApplyNumber>
                        ) : (
                          <div>{data.applies.length}</div>
                        )}
                      </WaitingTextWrapper>
                    ) : (
                      <MatchingText>매칭됨</MatchingText>
                    )}
                  </TopInfoWrapper>
                  <UserFavoriteGender>
                    {data.favoriteGender === 2 ? (
                      <div>상관없어요</div>
                    ) : data.favoriteGender === 1 ? (
                      <div> 남성분과 동행할래요</div>
                    ) : (
                      <div> 여성분과 동행할래요</div>
                    )}

                    <div> {data.startDate.split('T')[0]}</div>
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
                onClick={() => navigate(`/detail_page/${data.id}`)}
              >
                <ProfileImage src={TitleImg} />
                <ContentsWrapper>
                  <TopInfoWrapper>
                    <div>
                      <Title>{data.title}</Title>
                      <UserName>{data.user?.name}</UserName>
                    </div>
                    {signedInUser &&
                      data.applies.map((apply) => {
                        if (apply.userId === signedInUser.id) {
                          if (apply.status === 0) {
                            return (
                              <WaitingTextWrapper>
                                <WaitingText>대기중</WaitingText>
                              </WaitingTextWrapper>
                            )
                          } else if (apply.status === 1) {
                            return <MatchingText>승인됨</MatchingText>
                          } else if (apply.status === 2) {
                            return (
                              <WaitingTextWrapper>
                                <WaitingText>리젝됨</WaitingText>
                              </WaitingTextWrapper>
                            )
                          }
                        }
                      })}
                  </TopInfoWrapper>

                  <UserFavoriteGender>
                    {data.favoriteGender === 2 ? (
                      <div>상관없어요</div>
                    ) : data.favoriteGender === 1 ? (
                      <div> 남성분과 동행할래요</div>
                    ) : (
                      <div> 여성분과 동행할래요</div>
                    )}

                    <div> {data.startDate.split('T')[0]}</div>
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

const WaitingText = styled.div`
  margin-right: 3px;
`

const ApplyNumber = styled.div`
  color: ${theme.color.primary};
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
  cursor: pointer;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.3rem;
`

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: ${theme.color.grey};
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

const TopInfoWrapper = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
`

const WaitingTextWrapper = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  color: ${theme.color.grey};
`

const MatchingText = styled(WaitingText)`
  color: ${theme.color.primary};
  font-weight: 700;
  font-size: 15px;
`

const UserFavoriteGender = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  margin-top: 0.3rem;
`

const PostListBottom = styled.div`
  ${({ continueFetching }) =>
    !continueFetching &&
    `
    display: none !important;
  `}
`

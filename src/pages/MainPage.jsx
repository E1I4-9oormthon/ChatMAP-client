import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'

export const MainPage = () => {
  const mock = [
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
    {
      profileImage: TitleImg,
      userName: '광치기올레',
      favoriteGender: 'm',
      visitDate: '2023.03.31',
    },
  ]

  return (
    <Wrapper>
      {mock.map((data) => (
        <SuggestBox>
          <ProfileImage src={data.profileImage} />
          <ContentsWrapper>
            <UserName>{data.userName}</UserName>
            <UserFavoriteGender>
              <div>
                {data.favoriteGender === 'f' ? '여성분' : '남성분'}과 동행할래요
              </div>
              <div>{data.visitDate}</div>
            </UserFavoriteGender>
          </ContentsWrapper>
        </SuggestBox>
      ))}
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

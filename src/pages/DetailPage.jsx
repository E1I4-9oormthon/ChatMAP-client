import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'
import MapImg from '../assets/images/map_img.png'
import CalendarIcon from '../assets/icons/calendar_ico.png'
import GenderIcon from '../assets/icons/gender_ico.png'
import LocationIcon from '../assets/icons/location_ico.png'

export const DetailPage = () => {
  return (
    <Wrapper>
      <ProfileImageWrapper>
        <ProfileImage src={TitleImg} />
      </ProfileImageWrapper>
      <Title>저녁에 올레길 산책하실 분</Title>
      <InfoWrapper>
        <InfoBox>
          <InfoIcon src={CalendarIcon} />
          온평 - 표선 올레 A코스
        </InfoBox>
        <InfoBox>
          <InfoIcon src={GenderIcon} />
          남성분과 동행할래요
        </InfoBox>
        <InfoBox>
          <InfoIcon src={LocationIcon} />
          2023.03.30
        </InfoBox>
      </InfoWrapper>
      <MapImage src={MapImg} />
      <CommentListWrapper>
        <CommentListTitle>같이 동행하고 싶어요</CommentListTitle>
      </CommentListWrapper>
    </Wrapper>
  )
}

const InfoWrapper = styled.div`
  padding: 1.5rem 0;
`

const InfoIcon = styled.img`
  width: 2rem;
  margin-right: 1rem;
`
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2 0;
`

const Wrapper = styled.div`
  background: ${theme.color.white};
  height: calc(100% - 2rem);
  padding: 1rem;
  overflow: scroll;
  word-break: break-all;
`

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

const ProfileImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 1rem;
`
const MapImage = styled.img`
  margin-bottom: 1rem;
`

const CommentListWrapper = styled.div`
  border-top: 10px solid ${theme.color.lightGrey};
  padding: 2rem 0;
`

const CommentListTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`

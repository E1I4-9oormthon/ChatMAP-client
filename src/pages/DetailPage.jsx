import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import TitleImg from '../assets/images/title_img.png'
import MapImg from '../assets/images/map_img.png'
import CalendarIcon from '../assets/icons/calendar_ico.png'
import GenderIcon from '../assets/icons/gender_ico.png'
import LocationIcon from '../assets/icons/location_ico.png'
import api from '../apis/api'

export const DetailPage = () => {
  const params = useParams()
  const [data, setData] = useState()

  const fetchDetailData = async () => {
    const fetchedData = await api.get(`/olles/${params.id}`)
    setData(fetchedData.data.data)
  }

  useEffect(() => {
    fetchDetailData()
  }, [])

  const courseData = {
    1: '시흥 - 광치기 올레',
    2: '우도 - 올레',
    3: '광치기 - 온평 올레',
    4: '온평 - 표선 올레 A코스',
    5: '온평 - 표선 올레 B코스',
    6: '표선 - 남원 올레',
    7: '남원 - 쇠소깍 올레',
    8: '쇠소깍 - 제주올레 여행자센터 올레',
    9: '제주올레 여행자센터 - 월평 올레',
    10: '서귀포 버스터미널 - 제주올레 여행자센터 올레',
    11: '월평 - 대평 올레',
    12: '대평 - 화순 올레',
    13: '화순 - 모슬포 올레',
    14: '가파도 - 올레',
    15: '모슬포 - 무릉 올레',
    16: '무릉 - 용수 올레',
    17: '용수 - 저지 올레',
    18: '저지 - 서광 올레',
    19: '한림 - 고내 올레 A코스',
    20: '한림 - 고내 올레 B코스',
    21: '고내 - 광령 올레',
    22: '광령 - 제주원도심 올레',
    23: '제주원도심 - 조천 올레',
    24: '상추자 - 올레',
    25: '하추자 - 올레',
    26: '조천 - 김녕 올레',
    27: '김녕 - 하도 올레',
    28: '하도 - 종달 올레',
  }

  return (
    <Wrapper>
      {data && (
        <>
          <ProfileImageWrapper>
            <ProfileImage src={TitleImg} />
          </ProfileImageWrapper>
          <Title>{data.title}</Title>
          <InfoWrapper>
            <InfoBox>
              <InfoIcon src={CalendarIcon} />
              {courseData[data.cours]}
            </InfoBox>
            <InfoBox>
              <InfoIcon src={GenderIcon} />
              {data.favoriteGender === 2 ? '여성분' : '남성분'}과 동행할래요
            </InfoBox>
            <InfoBox>
              <InfoIcon src={LocationIcon} />
              {data.startDate.split('T')[0]}
            </InfoBox>
          </InfoWrapper>
          <MapImage src={MapImg} />
        </>
      )}
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

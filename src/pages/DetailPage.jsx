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
import { CommentTextBox } from '../components/layouts/CommentTextBox'
import Swal from 'sweetalert2'

export const DetailPage = () => {
  const params = useParams()
  const [data, setData] = useState()
  const commentRef = useRef()
  const [writer, setWriter] = useState()
  const [signedInUser, setSignedInUser] = useState()
  const [applyStatus, setApplyStatus] = useState(0)

  const fetchDetailData = async () => {
    const fetchedData = await api.get(`/olles/${params.id}`)
    console.log('글쓴이', fetchedData.data.data.user.name)
    setWriter(fetchedData.data.data.user.name)
    setData(fetchedData.data.data)
    console.log('정보', fetchedData)
    // setApplyStatus()
  }

  const checkMe = async () => {
    await api
      .get(`/users/me`, {
        headers: {
          Authorization: sessionStorage.getItem('accesstoken'),
        },
      })

      .then((res) => {
        console.log('나는 누구냥', res.data.data.name)
        setSignedInUser(res.data.data.name)
      })
      .catch((err) => {
        console.log('실패', err)
      })
  }

  useEffect(() => {
    fetchDetailData()
    checkMe()
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

  const handleComment = async () => {
    const CommentData = {
      olleId: Number(params.id),
      content: commentRef.current.value,
    }

    if (!CommentData.olleId || !CommentData.content) {
      window.alert('글을 입력해주세요!')
    } else {
      await api
        .post('/olles/applies', CommentData)
        .then((res) => {
          console.log(res)
          Swal.fire({
            title: '동행이 신청되었어요',
            confirmButtonColor: '#FAA250',
          })
        })

        .catch((err) => {
          const { response: errorResponse } = err
          if (errorResponse.status) {
            return window.alert('중복신청은 불가해요')
          }
          console.log('동행신청 실패', err)
        })
    }
  }

  const handleApply = async (data, status) => {
    const ApplyData = {
      applyId: data.id,
      olleId: data.olleId,
      status: status,
    }

    console.log(ApplyData)

    await api
      .put('/olles/applies', ApplyData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('실패!', err)
      })
  }

  const handleAccept = (result, data) => {
    console.log(result)
    if (result) {
      Swal.fire({
        title: '동행이 수락되었어요',
        text: '동행자와 채팅으로 이야기를 나눠보세요',
        confirmButtonColor: '#FAA250',
        confirmButtonText: '채팅하기',
      })
      handleApply(data, 1)
      setApplyStatus(1)
      handleApply(data, 1)
      setApplyStatus(1)
    } else {
      Swal.fire({
        title: '동행이 거절되었어요',
        confirmButtonColor: '#FAA250',
      })
      handleApply(data, 2)
      setApplyStatus(2)
      handleApply(data, 2)
      setApplyStatus(2)
    }
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
              {data.favoriteGender === 2 ? (
                <div>상관없어요</div>
              ) : data.favoriteGender === 1 ? (
                <div> 남성분과 동행할래요</div>
              ) : (
                <div> 여성분과 동행할래요</div>
              )}
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
        {writer === signedInUser ? (
          ''
        ) : (
          <CommentBox>
            <FlexWrap>
              <CommentInput
                ref={commentRef}
                placeholder="동행하고 싶은 내용을 입력해주세요."
              />
              <Button onClick={handleComment}>등록</Button>
            </FlexWrap>
          </CommentBox>
        )}

        {data?.applies.map((apply) => (
          <CommentBox>
            <CommentTextBox name={apply.user.name} content={apply.content} />
            {applyStatus === 0 ? (
              writer === signedInUser ? (
                <ButtonWrap>
                  <AcceptButton onClick={() => handleAccept(true, apply)}>
                    수락
                  </AcceptButton>
                  <RejectButton onClick={() => handleAccept(false, apply)}>
                    거절
                  </RejectButton>
                </ButtonWrap>
              ) : (
                <CommentPostButton>대기중</CommentPostButton>
              )
            ) : applyStatus === 1 ? (
              <ChatButton>채팅하기</ChatButton>
            ) : (
              <ChatButton>싫다</ChatButton>
            )}
          </CommentBox>
        ))}
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

const CommentBox = styled.div`
  border: 0.846154px solid #e1e1e8;
  margin-top: 1rem;
  border-radius: 7px;
  width: 100%;
  min-height: 45px;
  padding: 18px;
  box-sizing: border-box;
`

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`

const CommentInput = styled.textarea`
  width: 75%;
  border: none;
  color: #858899;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  &::placeholder {
    color: #bcbcbc;
  }
`
const Button = styled.div`
  margin-left: 15px;
  width: 22%;
  height: 33px;
  background-color: #faa250;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
`
const CommentPostButton = styled.div`
  width: 100%;
  height: 40px;
  color: white;
  background-color: #d9d9d9;
  border-radius: 6.76923px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`
const ButtonWrap = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 1rem;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  box-sizing: border-box;
`

const AcceptButton = styled.div`
  width: 46%;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faa250;
  color: white;
  border-radius: 7px;
  cursor: pointer;
`

const RejectButton = styled.div`
  width: 46%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 39px;
  background-color: white;
  color: #858899;
  border-radius: 7px;
  border: 1px solid #858899;
  cursor: pointer;
`
const ChatButton = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 39px;
  background-color: #faa250;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 7px;
  cursor: pointer;
`

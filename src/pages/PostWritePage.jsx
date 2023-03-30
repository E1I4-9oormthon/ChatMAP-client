import { useState, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import Calendar from 'react-calendar'
import '../styles/calenderStyles.css'
import moment from 'moment'
import mapImageZero from '../assets/images/map_img.png'
import mapImageOne from '../assets/images/map_img1.png'
import api from '../apis/api'
import mapImageTwo from '../assets/images/map_img2.png'
import mapImageThree from '../assets/images/map_img3.png'
import mapImageFour from '../assets/images/map_img4.png'
import mapImageFive from '../assets/images/map_img5.png'


export const PostWritePage = () => {
  const [value, onChange] = useState(new Date())
  const [selectGender, setSelectGender] = useState()
  const titleRef = useRef()
  const kakaoLinkRef = useRef()
  const courseRef = useRef(1)
  const handleGenderState = (value) => {
    setSelectGender(value)
  }

  const mapList = {
    0: mapImageZero,
    1: mapImageOne,
    2: mapImageTwo,
    3: mapImageThree,
    4: mapImageFour,
    5: mapImageFive,
  }

  const [selectedMapNumber, setSelectedMapNumber] = useState(0)

  const handlePost = () => {
    const PostData = {
      title: titleRef.current.value,
      favoriteGender: selectGender,
      cours: courseRef.current.value,
      startDate: value,
      openChatUrl: kakaoLinkRef.current.value,
      //   email: emailRef.current.value,
    }

    // if (
    //   !PostData.email ||
    //   !PostData.favoriteGender ||
    //   !PostData.cours ||
    //   !PostData.startDate
    //   // !PostData.password_check
    // ) {
    //   window.alert('필수입력값을 입력해주세요!')
    // } else {
    console.log(PostData)
    completePost(PostData)
    // }
  }

  const completePost = async (PostData) => {
    await api
      .post('/olles', PostData)
      .then((res) => {
        console.log(res)
        window.alert('성공!')
        //navigate('/detail_page/:id');
      })
      .catch((err) => {
        console.log('제안 등록 실패', err)
        window.alert('제안 등록 실패!')
      })
  }

  const handleMapSelect = (e) => {
    setSelectedMapNumber(parseInt(e.target.value) % 6)
  }

  return (
    <>
      <Wrapper>
        <Title>제목을 입력하세요</Title>
        <PostTitleInputBox
          placeholder="동행 제목을 입력해주세요"
          ref={titleRef}
        ></PostTitleInputBox>
        <Title>동행자 성별을 선택해주세요</Title>
        <ButtonWrap>
          <SelectGenderButton
            onClick={() => {
              handleGenderState(0)
            }}
          >
            여성
          </SelectGenderButton>
          <SelectGenderButton
            onClick={() => {
              handleGenderState(1)
            }}
          >
            남성
          </SelectGenderButton>
          <SelectGenderButton
            onClick={() => {
              handleGenderState(2)
            }}
          >
            상관없어요
          </SelectGenderButton>
        </ButtonWrap>
        <Title>언제 가시나요?</Title>
        <SelectDate>{moment(value).format('YYYY년 MM월 DD일')}</SelectDate>
        <CalenderWrap>
          <Calendar onChange={onChange} value={value} />
        </CalenderWrap>
        <Title>어디로 가시나요?</Title>
        <SelectPlaceDropBox
          defaultValue="default"
          id="category"
          name="category"
          ref={courseRef}
          value={selectedMapNumber}
          onChange={handleMapSelect}
        >
          <option value="1">시흥 - 광치기 올레 </option>
          <option value="2">우도 - 올레</option>
          <option value="3">광치기 - 온평 올레 </option>
          <option value="4">온평 - 표선 올레 </option>
          <option value="5">온평 - 표선 올레 </option>
          <option value="6">표선 - 남원 올레 </option>
          <option value="7">남원 - 쇠소깍 올레 </option>
          <option value="8">쇠소깍 - 제주올레 여행자센터 올레 </option>
          <option value="9"> 제주올레 여행자센터 - 월평 올레</option>
          <option value="10">
            서귀포 버스터미널 - 제주올레 여행자센터 올레
          </option>
          <option value="11"> 월평 - 대평 올레</option>
          <option value="12"> 대평 - 화순 올레</option>
          <option value="13"> 화순 - 모슬포 올레 </option>
          <option value="14"> 가파도 - 올레 </option>
          <option value="15"> 모슬포 - 무릉 올레</option>
          <option value="16">무릉 - 용수 올레 </option>
          <option value="17"> 용수 - 저지 올레 </option>
          <option value="18"> 저지 - 한림 올레 </option>
          <option value="19"> 저지 - 서광 올레 </option>
          <option value="20"> 한림 - 고내 올레 </option>
          <option value="21"> 고내 - 광령 올레 </option>
          <option value="22"> 광령 - 제주원도심 올레 </option>
          <option value="23"> 제주원도심 - 조천 올레 </option>
          <option value="24"> 상추자 - 올레 </option>
          <option value="25"> 하추자 - 올레 </option>
          <option value="26"> 조천 - 김녕 올레 </option>
          <option value="27"> 김녕 - 하도 올레 </option>
          <option value="28"> 하도 - 종달 올레 </option>
        </SelectPlaceDropBox>
        <Title>올레 코스</Title>
        <OllehMapImage src={mapList[selectedMapNumber]} />
        <Title>연락처를 입력해주세요</Title>
        <PostTitleInputBox
          placeholder="카카오 오픈채팅방 링크를 입력하세요"
          ref={kakaoLinkRef}
        ></PostTitleInputBox>

        <PostButton onClick={handlePost} isActivated={false}>
          등록하기
        </PostButton>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  height: calc(100% - 1rem);
  padding: 2rem 1rem;
  overflow: auto;
  box-sizing: border-box;
  word-break: break-all;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 0.5rem 0;
`

const PostTitleInputBox = styled.input`
  font-size: 14px;
  border: 0.85px solid rgb(225, 225, 232);
  padding-left: 20px;
  color: #858899;
  width: 100%;
  box-sizing: border-box;
  height: 51px;
  margin: 0.5rem auto 1rem;
  border-radius: 8px;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`
const SelectGenderButton = styled.div`
  width: 32%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 2px solid ${theme.color.grey};
  color: ${theme.color.grey};
  &:hover {
    border: 2px solid ${theme.color.primary} !important;
    font-weight: 700;
    cursor: pointer;
  }
  font-size: 16px;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0 0;
`

const CalenderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`

const SelectDate = styled.div`
  height: 38px;
  font-size: 14px;
  display: flex;
  align-items: center;
`

const SelectPlaceDropBox = styled.select`
  margin-top: 0.5rem;
  width: 100%;
  height: 55px;
  color: #858899;
  border: 0.85px solid #e1e1e8;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`

const OllehMapImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

const PostButton = styled.div`
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s ease;
  color: ${theme.color.white};
  background: ${theme.color.primary};
  ${({ isActivated }) =>
    isActivated &&
    `    
  &:hover {
    cursor: pointer;
  }
`}
  ${({ isActivated }) =>
    !isActivated &&
    `    
    background: ${theme.color.grey} !important;
`}
`

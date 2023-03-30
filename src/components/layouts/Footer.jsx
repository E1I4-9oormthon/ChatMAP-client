import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlineHome, AiFillPlusCircle } from 'react-icons/ai'
import { RxPerson } from 'react-icons/rx'
import { FooterButton } from './FooterButton'

export const Footer = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <FooterButton
        text="홈"
        color="#999999"
        handleClick={() => navigate('/main')}
      >
        <AiOutlineHome size="20" color="#999999" />
      </FooterButton>
      <FooterButton text="제안하기" color="#FAA250">
        <AiFillPlusCircle size={25} color="#FAA250" />
      </FooterButton>

      <FooterButton
        text="마이페이지"
        color="#999999"
        handleClick={() => navigate('/my_page')}
      >
        <RxPerson size={20} color="#999999" />
      </FooterButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  padding-top: 14px;
  padding-right: 30px;
  padding-left: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  height: 97px;
  box-shadow: 0px -3.64486px 7.28972px rgba(0, 0, 0, 0.15);
`

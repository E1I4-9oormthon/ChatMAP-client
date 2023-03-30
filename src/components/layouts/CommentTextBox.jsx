import styled from 'styled-components'
import MapImg from '../../assets/images/map_img.png'

export const CommentTextBox = ({ name, content }) => {
  return (
    <Wrapper>
      <ProfileImage src={MapImg} />
      <CommentBox>
        <UserName>{name}</UserName>
        <Content>{content}</Content>
      </CommentBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 8px;
`
const CommentBox = styled.div`
  width: 100%;
`

const UserName = styled.div`
  height: 22px;
  font-weight: 400;
  color: #d9d9d9;
`

const Content = styled.div`
  color: #858899;
  font-weight: 500px;
`

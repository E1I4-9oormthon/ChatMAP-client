import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { theme } from '../../styles/theme'
import { Header } from './Header'

export const Layout = () => {
  return (
    <Main>
      <Header />
      <Section>
        <Outlet />
      </Section>
    </Main>
  )
}

const Main = styled.div`
  background: ${theme.color.white};
  width: 100%;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Section = styled.section`
  width: 100%;
  max-width: 500px;
  height: 100%;
`

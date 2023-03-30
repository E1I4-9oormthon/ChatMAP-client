import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { theme } from '../../styles/theme'
import { Header } from './Header'

export const Layout = () => {
  return (
    <Main>
      <Section>
        <Header />
        <Outlet />
      </Section>
    </Main>
  )
}

const Main = styled.div`
  background: ${theme.color.white};
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Section = styled.section`
  width: 100%;
  max-width: 500px;
`

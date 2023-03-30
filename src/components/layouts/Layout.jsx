import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { theme } from '../../styles/theme'

export const Layout = () => {
  return (
    <Main>
      <Section>
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

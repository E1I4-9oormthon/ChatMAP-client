import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

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
  background: #008080;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Section = styled.section`
  background: #a0ffff;
  width: 100%;
  max-width: 500px;
`

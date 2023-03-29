import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layouts/Layout'
import { HomePage } from '../pages/HomePage'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

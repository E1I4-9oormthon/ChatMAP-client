import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layouts/Layout'
import { FavoriteSelectPage } from '../pages/FavoriteSelectPage'
import { WelcomePage } from '../pages/WelcomePage'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/favorite_select" element={<FavoriteSelectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

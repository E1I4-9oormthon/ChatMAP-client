import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layouts/Layout'
import { FavoriteSelectPage } from '../pages/FavoriteSelectPage'
import { PostWritePage } from '../pages/PostWritePage'
import { WelcomePage } from '../pages/WelcomePage'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/favorite_select" element={<FavoriteSelectPage />} />
          <Route path="/post_write" element={<PostWritePage />} />
        </Route>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

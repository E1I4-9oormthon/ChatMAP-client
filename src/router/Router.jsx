import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layouts/Layout'
import { FavoriteSelectPage } from '../pages/FavoriteSelectPage'
import { MainPage } from '../pages/MainPage'
import { PostWritePage } from '../pages/PostWritePage'
import { WelcomePage } from '../pages/WelcomePage'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/favorite_select" element={<FavoriteSelectPage />} />
        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/post_write" element={<PostWritePage />} />
        </Route>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

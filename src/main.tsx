import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomeView from '@/features/home/HomeView.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import CharactersView from '@/features/characters/CharactersView.tsx';
import AuthView from '@/features/auth/AuthView.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/characters/:page" element={<CharactersView />} />
        <Route path="/auth" element={<AuthView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

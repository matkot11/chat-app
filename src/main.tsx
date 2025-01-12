import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomeView from '@/features/home/HomeView.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

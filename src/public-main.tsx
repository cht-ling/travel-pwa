import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicApp from './PublicApp';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

if ('caches' in window) {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => caches.delete(cacheName));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PublicApp />
  </StrictMode>,
);
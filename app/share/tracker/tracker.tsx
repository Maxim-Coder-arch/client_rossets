'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const Tracker = () => {
  const pathname = usePathname();
  const hasTracked = useRef(false); // Защита от дублей в одном сеансе
  const lastTrackedPath = useRef<string>(''); // Защита от дублей при одном пути

  useEffect(() => {
    const trackVisit = async () => {
      // Не трекаем админку
      if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
        return;
      }

      // Защита от повторного трека на одном и том же пути
      if (lastTrackedPath.current === pathname && hasTracked.current) {
        return;
      }

      // Получаем или создаём visitorId
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
        localStorage.setItem('visitorId', visitorId);
      }

      // Получаем sessionId для текущей сессии
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
        sessionStorage.setItem('sessionId', sessionId);
      }

      // Проверяем, не трекали ли эту страницу в текущей сессии
      const trackedPages = JSON.parse(sessionStorage.getItem('trackedPages') || '[]');
      if (trackedPages.includes(pathname)) {
        return;
      }

      // Сохраняем, что страницу уже трекнули
      trackedPages.push(pathname);
      sessionStorage.setItem('trackedPages', JSON.stringify(trackedPages));

      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            sessionId,
            page: pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          }),
        });
        
        lastTrackedPath.current = pathname;
        hasTracked.current = true;
      } catch (error) {
        console.error('Track error:', error);
      }
    };

    // Небольшая задержка, чтобы избежать race condition
    const timer = setTimeout(trackVisit, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
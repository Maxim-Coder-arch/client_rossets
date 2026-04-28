'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const Tracker = () => {
  const pathname = usePathname();
  const hasTracked = useRef(false);
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    const trackVisit = async () => {
      if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
        return;
      }
      if (lastTrackedPath.current === pathname && hasTracked.current) {
        return;
      }
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
        localStorage.setItem('visitorId', visitorId);
      }
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
        sessionStorage.setItem('sessionId', sessionId);
      }
      const trackedPages = JSON.parse(sessionStorage.getItem('trackedPages') || '[]');
      if (trackedPages.includes(pathname)) {
        return;
      }
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

    const timer = setTimeout(trackVisit, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';

export const AppUrlListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Handle deep link when app is already open
    const listener = App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log('Deep link received:', event.url);
      navigate(`/verify-payment`);

      try {
        const url = new URL(event.url);
        const pathname = url.pathname;           // e.g. "/verify-payment"
        const searchParams = url.searchParams;
        if (pathname === '/verify-payment' || pathname.includes('verify-payment')) {
          const txRef = searchParams.get('tx_ref') || searchParams.get('reference');
          if (txRef ) {
              navigate(`/verify-payment?trxref=${txRef}&reference=${txRef}`);
          } else {
            navigate(`/verify-payment?status=failed`);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    });

    // 2. Handle case where app was launched by deep link
    App.getLaunchUrl().then((launchUrl) => {
      if (launchUrl?.url) {
        console.log('App launched via deep link:', launchUrl.url);
        // You can reuse the same parsing logic here (extract to function if needed)
      }
    });

    // Cleanup
    return () => {
      // listener.remove();
    };
  }, [navigate]);

  return null; // No UI — just side effects
};
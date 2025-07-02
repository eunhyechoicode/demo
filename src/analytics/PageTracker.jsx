import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAnalytics from './useAnalytics.jsx';

export default function PageTracker() {
    const location = useLocation();
    const analytics = useAnalytics();

    useEffect(() => {
        analytics.page({
            path: location.pathname,
            search: location.search,
            url: window.location.href
        });
    }, [location, analytics]);

    return null;
}

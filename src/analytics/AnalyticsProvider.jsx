import PropTypes from 'prop-types';
import { analytics } from "./analytics.js";
import AnalyticsContext from "./AnalyticsContext.jsx";

export function AnalyticsProvider({ children }) {
    return (
        <AnalyticsContext.Provider value={analytics}>
            {children}
        </AnalyticsContext.Provider>
    )
}

AnalyticsProvider.propTypes = {
    children: PropTypes.node.isRequired
};


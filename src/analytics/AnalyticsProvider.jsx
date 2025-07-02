import { createContext } from 'react'

import PropTypes from 'prop-types';
import { analytics } from "./analytics.js";

export const AnalyticsContext = createContext(null)

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


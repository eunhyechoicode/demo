
export default function customAnalyticsPlugin (userConfig) {
    return {
        name: 'custom-analytics',

        config: userConfig,

        // Called when analytics initializes
        initialize: ({ config }) => {
            console.log('Analytics initialized with config:', config)
        },

        // Track page views
        page: ({ payload }) => {
            console.log('Page view:', {
                path: payload.properties.path,
                title: payload.properties.title
            })
        },

        // Track custom events
        track: ({ payload }) => {
            console.log('Event tracked:', {
                name: payload.event,
                properties: payload.properties
            })
        }
    }
}
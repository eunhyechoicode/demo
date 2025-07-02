import Analytics from "analytics";
import customAnalyticsPlugin from './plugin'

export const analytics = Analytics({
    app: 'my-app',
    plugins: [
        customAnalyticsPlugin({
            // Your custom plugin config
        })
    ]
})
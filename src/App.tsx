import React from 'react'
import {DidomiSDK} from '@didomi/react'
import {ConsentWidget} from "./ContentWidget";

declare global {
    interface Window { didomiWidgetsOnReady: any; }
}

export const App: React.FC = ({children}) => {

    const didomiConfig = {
        apiKey: '4783d326-7837-4548-aa35-69967e034881',
        app: {apiKey: '4783d326-7837-4548-aa35-69967e034881'},
        components: {version: 2, helpersEnabled: true, componentsEnabled: true},
        user: {
            shouldReadTokenFromLocalStorage: true,
        },
        widgets: [],
    }

    return (<>
        <DidomiSDK
            apiKey='4783d326-7837-4548-aa35-69967e034881'
            iabVersion={2} // If you want to support the TCF v1∏, don't forget to change this value, even if you selected the TCF v2 in the console. This parameter will load the correct stub in the React Component
            gdprAppliesGlobally={true}
            noticeId='JpDFLYBe'
            sdkPath='https://sdk.privacy-center.org/'
            embedTCFStub={true}
            config={didomiConfig}
            onReady={(didomi) =>
                console.log('Didomi SDK is loaded and ready', didomi)
            }
        />

        <ConsentWidget/>

    </>)
}

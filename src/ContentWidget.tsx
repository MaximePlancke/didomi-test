// @ts-nocheck
import React, {useState, useEffect, createContext} from "react";
import {ConsentForm} from './ConsentForm';

export const DidomiContext = createContext({})

export const ConsentWidget: React.FC = () => {
    const [display, setDisplay] = useState(false)
    const [lang, setLang] = useState('fr')

    const [container, setContainer] = useState()
    const [entities, setEntities] = useState();

    const toogleLanguage = () => {
        if(lang === 'fr') {
            setLang('en')
        } else {
            setLang('fr')
        }
    }

    useEffect(() => {
        if(container) {
            container.setWidgetLocale(lang);
        }
    }, [container, lang])

    useEffect(() => {
    window.didomiWidgetsOnReady = window.didomiWidgetsOnReady || [];
    // @ts-ignore
    window.didomiWidgetsOnReady.push(async (DidomiWidgets) => {
        const didomiContainer = await DidomiWidgets.getContainerById("WFN4hfn4");
        const didomiEntities = await didomiContainer.getEntities();
        console.log('didomiContainer', didomiContainer)
        console.log('didomiEntities', didomiEntities)

        setContainer(didomiContainer)
        setEntities(didomiEntities)

    })
    }, [lang]);

    const displayConsent = () => setDisplay(!display)
    // @ts-ignore
    return (
        <>
            <div>
                <button onClick={toogleLanguage}>Language:</button>
                <span> {lang}</span>
            </div>
        
            <DidomiContext.Provider value={{container, entities}}>
                <button onClick={displayConsent}>Display consent</button>
                <>
                    <b>Consent : </b>
                    {/* IMPORTANT: Wrap all your widget related elements in didomi-container-headless */}
                    <didomi-container-headless id="WFN4hfn4">
                        {container && (
                            <>
                                <didomi-consent-asked
                                    container-id={container.id}
                                ></didomi-consent-asked>
                                <didomi-if-authenticated container-id={container.id}>
                                    <didomi-pending-consent-receiver container-id={container.id}>
                                        {entities && display && (
                                            <ConsentForm />
                                        )}
                                    </didomi-pending-consent-receiver>

                                </didomi-if-authenticated>
                            </>
                        )}
                    </didomi-container-headless>
                </>
            </DidomiContext.Provider>
        </>
    )
}

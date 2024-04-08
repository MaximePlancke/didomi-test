import React, {useState, useRef, useContext, useEffect} from "react";
import {Card, Switch,} from "antd";
import {DidomiContext} from "./ContentWidget";

export const ConsentPurpose: React.FC = () => {
    const didomiObjects: any = useContext(DidomiContext);
    const container = didomiObjects.container;
    const entities = didomiObjects.entities;
    const purpose = entities?.purposes[0]
    const id = purpose?.id

    const [purposeEnabled, setPurposeEnabled] = useState();

    useEffect(() => {
        if (container) {
            setPurposeEnabled(container.getPurposeEnabledById(id));
        }
    }, [container, entities, id]);

    const sectionRef = useRef(null);

    const sendPurposeConsent = (event:any) => {
        setPurposeEnabled(event);
        // IMPORTANT: Dispatch a 'didomi:set-pending-consents' event with the enabled value of the purpose to store the consent in a pending state
        const consentToPurpose = new CustomEvent("didomi:set-pending-consents", {
            detail: {
                purposeId: id,
                value: event,
            },
            bubbles: true,
            composed: true,
        });
        // @ts-ignore
        sectionRef?.current?.dispatchEvent(consentToPurpose);
    };

    return (
        <div ref={sectionRef}>
            {purpose && (
            <Card>
                {/* IMPORTANT: Use 'didomi-entity-content' to display your entities translated content */}

                <h1>
                    {   /* @ts-ignore*/}
                    <didomi-entity-content
                        entity-id={id}
                        entity-property="name"
                        entity-type="purpose"
                        container-id={container.id}
                        with-component-content={true}
                    >{   /* @ts-ignore*/}
                    </didomi-entity-content>
                </h1>


                <div>My custom text</div>
                {   /* @ts-ignore*/}
                <didomi-entity-content
                    entity-id={id}
                    entity-property="description"
                    entity-type="purpose"
                    container-id={container.id}
                    with-component-content={true}
                >{   /* @ts-ignore*/}
                </didomi-entity-content>
                <Switch
                    checked={purposeEnabled}
                    onChange={sendPurposeConsent}
                />
            </Card>
            )}
        </div>
    );
}
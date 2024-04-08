import React, {useEffect, useRef, useState} from "react";
import {Button} from "antd";
import {ConsentPurpose} from "./ConsentPurpose";

export const ConsentForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const buttonRef = useRef(null);

    const savePendingConsents = () => {
        // IMPORTANT: Dispatch a 'didomi:save-pending-consents' custom event when the user wants to save its pending consents.
        const consentToPurpose = new CustomEvent("didomi:save-pending-consents", {
            detail: {},
            bubbles: true,
            composed: true,
        });
        // @ts-ignore
        buttonRef?.current?.dispatchEvent(consentToPurpose);
    };

    useEffect(() => {
        const setConsentsLoadingEvent = () => {
            setLoading(true);
        };
        const setConsentsFailureEvent = (event:any) => {
            setLoading(false);
            console.error("Sorry, an error occurred: consent has not been updated", {
                toastId: "pending-consents-error",
            });
        };
        const setConsentsSuccessEvent = (event:any) => {
            setLoading(false);
            console.log("Consent has been saved successfully!", {
                toastId: "pending-consents-success",
            });
        };
        // IMPORTANT: You can also listen to specific pending consents events (loading, success, error)
        document.addEventListener(
            "didomi:save-pending-consents-loading",
            setConsentsLoadingEvent
        );
        document.addEventListener(
            "didomi:save-pending-consents-error",
            setConsentsFailureEvent
        );
        document.addEventListener(
            "didomi:save-pending-consents-success",
            setConsentsSuccessEvent
        );

        return () => {
            document.removeEventListener(
                "didomi:save-pending-consents-loading",
                setConsentsLoadingEvent
            );
            document.removeEventListener(
                "didomi:save-pending-consents-error",
                setConsentsFailureEvent
            );
            document.removeEventListener(
                "didomi:save-pending-consents-success",
                setConsentsSuccessEvent
            );
        };
    });

    return (
        <div>
            <ConsentPurpose></ConsentPurpose>
            <Button
                className="save-consents-button"
                onClick={savePendingConsents}
                ref={buttonRef}
                disabled={loading}
            >
                SAVE
            </Button>
        </div>
    );
}
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const AdaptiveBlock = ({ devices, children }) => {
    const onChange = (device) => (matches: boolean) => {
        setState(prevState => ({ ...prevState, [device]: matches }));
    };

    const desktop = useMediaQuery({ minWidth: 1280 }, undefined, onChange("desktop"));
    const tablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 }, undefined, onChange("tablet"));
    const mobile = useMediaQuery({ maxWidth: 767 }, undefined, onChange("mobile"));
    const [state, setState] = useState({ desktop, tablet, mobile });

    return <>{devices.some(device => state[device]) && children}</>;
};

export default AdaptiveBlock;

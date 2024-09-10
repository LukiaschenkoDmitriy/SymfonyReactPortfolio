import "./ProgressBar.scss";

import React, { CSSProperties } from "react";

export interface ProgressBarProps {
    background: string,
    value: number,
    maxValue: number,
    textVisible: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({background, value, maxValue, textVisible}) => {
    const styles: CSSProperties = {
        background: background,
        width: `${(value / maxValue) * 100}%`,
    }


    return (
        <div className="sr-progress">
            <div className="sr-progress-container" style={styles}>
                <strong>{(textVisible ? (<div>{value}/{maxValue}</div>) : (<></>))}</strong>
            </div>
        </div>
    )
}

export default ProgressBar;
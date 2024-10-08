import "./ProgressBar.scss";

import React, { CSSProperties } from "react";

// This file defines the ProgressBar component, which renders a progress bar with customizable background color, value, and maximum value.
// It also conditionally displays the progress text based on the textVisible prop.

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
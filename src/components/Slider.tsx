import React from "react";
import RangeSlider from 'react-bootstrap-range-slider';

const valueToTime: { [key: number]: string } = {
    0: "One Month",
    1: "Six Months",
    2: "One Year",
}

interface SliderProps {
    doAfterChange: (choice: number) => void;
    min: number;
    max: number;
    width: number;
    label?: string;
}

const Slider = ({doAfterChange, min, max, width, label}: SliderProps) => {
    

    const [ value, setValue ] = React.useState(1);

    const sliderStyle = {
        width: `${width}%`,
        margin: '0 auto',
        padding: '10px',
	};
  
    return (
        <div style={sliderStyle}>
            <RangeSlider
                value={value}
                min={min}
                max={max}
                onChange={e => setValue(parseInt(e.target.value))}
                tooltipLabel={() => label ? label + value : valueToTime[value]}
                tooltip='on'
                style={{ width: '100%'}}
                size='lg'
                onAfterChange={() => doAfterChange(value)}
            />
        </div>
    );
};

export default Slider;
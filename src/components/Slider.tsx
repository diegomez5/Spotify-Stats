import React from "react";
import RangeSlider from 'react-bootstrap-range-slider';

const valueToTime: { [key: number]: string } = {
    0: "One Month",
    1: "Six Months",
    2: "One Year",
}

interface SliderProps {
    doAfterChange: (choice: number) => void;
}

const Slider = ({doAfterChange}: SliderProps) => {
    

    const [ value, setValue ] = React.useState(1);

    const sliderStyle = {
		position: 'absolute' as 'absolute',
		left: `${60}%`,
		top: `${20}%`,
        width: '20%',
        margin: '0 auto',
        padding: '20px',
	};
  
    return (
        <div style={sliderStyle}>
            <RangeSlider
                value={value}
                min={0}
                max={2}
                onChange={e => setValue(parseInt(e.target.value))}
                tooltipLabel={currentValue => valueToTime[currentValue]}
                tooltip='on'
                style={{ width: '100%'}}
                size='lg'
                onAfterChange={() => doAfterChange(value)}
            />
        </div>
    );
};

export default Slider;
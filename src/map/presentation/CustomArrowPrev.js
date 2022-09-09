import React from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa";
import '../style/MapPage.css';


function CustomArrowPrev(props) {
	return (
		props.sliderRef &&
		props.sliderRef.current &&
		props.sliderRef.current.slickPrev &&
		<button className='arrow'
			onClick={props.sliderRef.current.slickPrev}
		>
			<FaAngleDoubleRight
			className='Fa-Double'
			size="40"
				alt={"prev arrow"}
				style={{
					transform: "scaleX(-1)",
				}}
			/>
		</button>
	);
}

export default CustomArrowPrev;
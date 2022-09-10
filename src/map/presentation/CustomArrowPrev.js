import React from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa";
import '../style/MapPage.css';


function CustomArrowPrev(props) {
	let onClick = null;
	if (props.sliderRef &&
			props.sliderRef.current &&
			props.sliderRef.current.slickPrev) {
				onClick = props.sliderRef.current.slickPrev;
	}
	return (
		<button className='arrow'
			onClick={onClick}
		>
			<FaAngleDoubleRight
			className='Fa-Double'
			id='Fa-Doublee'
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
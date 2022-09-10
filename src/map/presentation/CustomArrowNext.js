import React from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa";
import '../style/MapPage.css';

function CustomArrowNext(props) {
	let onClick;
	if (props.sliderRef &&
			props.sliderRef.current &&
			props.sliderRef.current.slickNext) {
				onClick = props.sliderRef.current.slickNext;
	}
	return (
		<button className='arrow'
			onClick={onClick}
		>
			<FaAngleDoubleRight
				className='Fa-Double'
				id="Fa-Next"
				size="40"
				src={"http://cdn.onlinewebfonts.com/svg/img_92254.png"}
				alt={"next arrow"}
			/>
		</button>
	);
}

export default CustomArrowNext;
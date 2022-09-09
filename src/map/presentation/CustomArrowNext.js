import React from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa";
import '../style/MapPage.css';

function CustomArrowNext(props) {
	return (
		props.sliderRef &&
		props.sliderRef.current &&
		props.sliderRef.current.slickNext &&
		<button className='arrow'
			onClick={props.sliderRef.current.slickNext}
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
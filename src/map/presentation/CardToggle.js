import React from 'react';
import stay from '../../src_asset/stay_logo.png';
import tour from '../../src_asset/tour_pin.png';

function CardToggle(props) {
	return (
		<div className="card-toggle-container">
			<button className='stay-toggle'
				onClick={() => {
					props.setNear(prev => ({
						...prev,
						isStay: true,
					}));
				}}
			>
				<img
					src={stay}
					alt='filter'
				/>
				<p>
					Stay
				</p>
			</button>
			<button className='tour-toggle'
				onClick={() => {
					props.setNear(prev => ({
						...prev,
						isStay: false,
					}));
				}}
			>
				<img
					src={tour}
					alt='filter'
				/>
				<p>
					Tour
				</p>
			</button>
		</div>
	);
}

export default CardToggle;
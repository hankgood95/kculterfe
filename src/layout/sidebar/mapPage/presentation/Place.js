import React from 'react';

function Place({ name, address, explain, phone_num }) {
	return (
		<div className="place">
			<div className="title">
				<h5>{name}</h5>
				<p>{address}</p>
				{
					phone_num &&
					<div className="phone-num">
						<p>Phone Number</p>
						<p>{phone_num}</p>
					</div>
				}
			</div>
			<div className="story-container">
				{
					explain &&
					<div className="story-content">
						<h6>story</h6>
						<p>{explain}</p>
					</div>
				}
			</div>
		</div>
	);
}

export default Place;
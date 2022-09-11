import React from 'react';

function Head(props) {
	return (
		<div className="head">
			{
				props.imageUrl &&
				<img
					src={props.imageUrl}
					alt={props.head}
				>
				</img>
			}
			<p>{props.head}</p>
		</div>
	);
}

export default Head;
import React from "react";

import kpop from "../../src_asset/kpop_img.png";
import culture from "../../src_asset/culture_img.png";

function FilterToggle(props) {
	return (
		<div className="filter-toggle-container">
			<button className="kpop-toggle"
				onClick={() => {
					props.setIsKpop(() => true);
				}}
			>
				<img
					src={kpop}
					alt='filter'
				/>
				<p>
					K-pop
				</p>
			</button>
			<button className="culture-toggle"
				onClick={() => {
					props.setIsKpop(() => false);
				}}
			>
				<img
					src={culture}
					alt='filter'
				/>
				<p>
					Culture
				</p>
			</button>
		</div>
	);
}

export default FilterToggle;
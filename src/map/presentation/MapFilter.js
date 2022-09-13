import React, {
	useEffect,
	useState,
} from 'react';
import FilterToggle from './FilterToggle';
import {
	useDispatch
} from 'react-redux';
import {
	fetchList,
	fetchSelected
} from '../container/handleFilter';

function MapFilter(props) {
	const [isKpop, setIsKpop] = useState(true);
	const [list, setList] = useState([]);
	const [value, setValue] = useState(undefined);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchList(isKpop, setList);
		setValue(() => "");
	}, [isKpop]);
	useEffect(() => {
		setValue(() => undefined);
	}, [value])

  return(
		<div className='map-filter-container'>
			<select className='filter'
				value={value}
				onChange={(e) => {
					if (e.target.value !== "0") {
						fetchSelected(props.map, props.google, list, e, isKpop, props.setKculter, props.setCenter, props.setZoom, dispatch);
					}
				}}
			>
				{
					list &&
					list.map((item, index) => {
						return (
							<option
							key={index}
							value={item.hash}
							>
								{item.name}
							</option>
						);
					})
				}
			</select>

			<FilterToggle
				setKculter={props.setKculter}
				setIsKpop={setIsKpop}
			/>
		</div>
  );
}
export default MapFilter;
import React, {
	useEffect,
	useState,
} from 'react';
import { useSelector } from 'react-redux';
import Head from './Head';
import Place from './Place';
import CourseBox from './CourseBox'
import '../map-sidebar.css';

function MapSideNav(props) {
	const place = useSelector(state => state.place);
	const concert = useSelector(state => state.mapConcert);
	const [placeImg, setPlaceImg] = useState(null);

	useEffect(() => {
		props.handleOpen(true);
		setPlaceImg(place.fileUrl);
	}, [place]);

	return (
		<div className="map-sidebar">
			{
				place.head &&
				<Head
					imageUrl={place.imageUrl}
					head={place.head}
				/>
			}
			{
				place.name &&
				<img className="place-img"
					src={placeImg ? placeImg : place.fileUrl}
					alt={place.name}
				/>
			}
			{
				place.name &&
				<div className="map-sidebar-content">
					<Place
						name={place.name}
						address={place.address}
						explain={place.explain}
						phone={place.phone_num}
					/>
					{
						place.photos &&
						<div className="map-sidebar-photos">
							<div className="photos-title">
								<p>Photos</p>
							</div>
							<div className="photos-content">
								{place.photos.map((item, index) => 
										<img className="photos-item"
											key={index}
											src={item.getUrl()}
											alt={place.name}
											onClick={() => {
												setPlaceImg(item.getUrl())
											}}
										/>
								)}
							</div>
						</div>
					}
					{
						!concert.lat &&
						!concert.lng &&
						<CourseBox
							place={place}
						/>
					}
				</div>
			}
		</div>
	);
}

export default MapSideNav;
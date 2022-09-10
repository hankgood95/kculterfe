import React, {
	useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import Head from './Head';
import Place from './Place';
import CourseBox from './CourseBox'
import '../map-sidebar.css';

function MapSideNav(props) {
	const place = useSelector(state => state.place);
	const concert = useSelector(state => state.mapConcert);

	useEffect(() => {
		props.handleOpen(true);
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
				src={place.fileUrl}
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
					/>
					{/* {
						place.phone_num &&
						<div className="phone-num">
							<p>Phone Number</p>
							<p>{place.phone_num}</p>
						</div>
					} */}
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
										/>
								)}
							</div>
						</div>
					}
					{
						place.stayPhotos &&
						<div className="map-sidebar-photos">
							<div className="photos-title">
								<p>Photos</p>
							</div>
							<div className="photos-content">
								{place.stayPhotos.map((item) => 
										<img className="photos-item"
											src={item.image}
											alt={place.name}
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
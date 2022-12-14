import React, {
	useRef,
	useEffect,
} from 'react';
import Slider from "react-slick";
import CardToggle from './CardToggle';
import Cards from './Cards';
import CustomArrowPrev from './CustomArrowPrev';
import CustomArrowNext from './CustomArrowNext';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import noImage from '../../src_asset/no_img.png';

function MapCard(props) {
	const settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				}
			}
		],
	}
	const sliderRef = useRef();

	useEffect(() => {
		if (props.near.place) {
			if (props.near.place.length < settings.slidesToShow) {
				settings.slidesToShow = props.near.place.length;
			}
			settings.responsive.map((item) => {
				if (props.near.place.length < item.settings.slidesToShow) {
					item.settings.slidesToShow = props.near.place.length;
				}
			})
		}
	}, [])

	return (
		props.near.place
		?
		<div className='map-card-container'>
			<CardToggle
				setNear={props.setNear}
			/>
			<div className='map-card'>
				<CustomArrowPrev
					sliderRef={sliderRef}
				/>

				<Slider className="card-box"
					ref={sliderRef}
					{ ...settings }
				>
					{props.near.place &&
					props.near.place.map((item, index) => {
						const head = props.near.isStay ? "STAY" : "TOUR";
						const pin = props.near.isStay ? props.near.stayPin : props.near.tourPin;
						const image = item.firstimage ? item.firstimage : noImage;
						return (
							<Cards
								key={index}
								pin={pin}
								item={item}
								title={item.title}
								image={image}
								head={head}
								setCenter={props.setCenter}
								setZoom={props.setZoom}
								dispatch={props.dispatch}
							/>
							);
						}
					)}
				</Slider>

				<CustomArrowNext
					sliderRef={sliderRef}
				/>
			</div>
		</div>
		:
		<h1>?????? ???...</ h1>
	);
}

export default MapCard;
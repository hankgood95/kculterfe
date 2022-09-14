import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoxCardItem from './BoxCardItem';
import { getCourseList } from '../../container/GetCours';
import styled from 'styled-components';

function BoxCardList() {
	let dayNum = 1;
	const [data, setData] = useState([]);

	useEffect(() => {
			getCourseList()
			.then(resData => {
				setData(resData)
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<div className="box-list">
			{ (data != 0) && data.map((course, index) => <BoxCardItem key={index} props={course} dayNum={dayNum++} {...course} />) || <TextSize>Please add course.</TextSize> }
			<Link className='text-black' to='/MapPage'>
				<AddtoCouseBtn title="Add course">
					+
				</AddtoCouseBtn>
			</Link>
		</div>
	)
}

// css

const TextSize = styled.div`
	font-size: 2rem;
	
	@media all and (max-width:767px) {
		text-align: center;
	}

`

const AddtoCouseBtn = styled.span`
	font-size: 20px;
	position: absolute;
	border-radius: 50%;
	border: 1px solid gray;
	box-shadow: 0px 0px 4px 0.1px gray;
	padding: 1px 11.5px 3.5px 12px;
	outline: 2px solid black;
	outline-offset: -9px;
	background: white;
	opacity: 0.7;
	

	&:hover {
		background: #f4029b;
		cursor: pointer;
	}
	@media all and (min-width:768px) {
		right: 100px;
		bottom: 80px;
	}

	@media all and (max-width:767px) {
		right: 40px;
		bottom: 30px;
	}
`

export default BoxCardList;

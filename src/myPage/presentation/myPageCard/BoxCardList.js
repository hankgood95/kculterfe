import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoxCardItem from './BoxCardItem';
import { getCourseList } from '../../container/GetCours';
import styled from 'styled-components';

function BoxCardList() {
	let dayNum = 1;
	// DB서버에서 course 데이터 받기.
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
			{ data&&data.map((course, index) => <BoxCardItem key={index} props={course} dayNum={dayNum++} {...course} />) || <div>Please add course.</div> }
			<Link className='text-black' to='/MapPage'>
				<AddtoCouseBtn>
					+
				</AddtoCouseBtn>
			</Link>
		</div>
	)
}

const AddtoCouseBtn = styled.span`
    font-size: 20px;
    position: absolute;
    right: 100px;
    bottom: 80px;
    border-radius: 50%;
    border: 1px solid gray;
	box-shadow: 0px 0px 4px 0.1px gray;
    padding: 1px 10px 3.5px 12px;
    outline: 2px solid black;
    outline-offset: -9px;

	&:hover {
		background: #f4029b;
		cursor: pointer;
	}
`

export default BoxCardList;

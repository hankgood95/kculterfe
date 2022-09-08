import React, { useState, useEffect } from 'react';
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
			<AddtoCouseBtn>
                        +
            </AddtoCouseBtn>
		</div>
	)
}

const AddtoCouseBtn = styled.div`
    font-size: 20px;
    position: absolute;
    right: 80px;
    bottom: 470px;
    border-radius: 50%;
    border: 1px solid white;
	box-shadow: 1px;
    padding: 1px 10px 3.5px 12px;
    outline: 1px solid black;
    outline-offset: -9px;
`

export default BoxCardList;

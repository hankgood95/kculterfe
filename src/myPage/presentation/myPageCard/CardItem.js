import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CLICK_PLACE } from '../../../redux/reducer';
import "../../styles/MyPage.css"
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

function CardItem({ props, index, end }) {

	const dispatch = useDispatch();
	const [displayFlag, setDisplayFlag] = useState(true);
	if ((index + 1) === end) {
		useEffect(() => {
			setDisplayFlag(false);
		})
	}


    const moveToMap = () => {
        let place = props
		
        dispatch({
            type: CLICK_PLACE,
            data: place
        })
    }

	return (
		<>
			<CardDiv>
				<Card className="body-card">
					<Link className="" to='/MapPage'>
						<Card className="body-card-hover" onClick={moveToMap}>
							<div className="square border border-1 rounded-pill m-auto" style={{ color: 'white', width: '6em' }}>
								<span className="px-2" style={{ width: '20px' }}>
									view more
								</span>
							</div>
						</Card>
					</Link>
					<Card.Img variant="top" className="m-auto" src={ props.fileUrl } style={{ height: '6em', width: '100%' }}/>
					<Card.Body className="body-card-body">
						<Card.Title className="text-center">
							<span style={{ fontSize: '1rem' }}>
								{ props.name }
							</span>
						</Card.Title>
					</Card.Body>
				</Card>
				<PathDesignCircle>
					<NumText DesignNum={index}>{index + 1}</NumText>
					<PathDesignLine check={displayFlag} />
				</PathDesignCircle>
			</CardDiv>
		</>
	);
}

// css

const NumText = styled.span`
	color: #3172F6;
	font-weight: 700;
	border-radius: 50%;
	border: 5px solid #3172F6; 
	padding: 1px 5.3px;
	margin-top: 0;
	margin-left: -8px;

	@media all and (min-width:768px) {
		${props => {
			if (props.DesignNum === 0) {
				return`
					padding: 1px 7px;
				`
			}
		}
		}};
	}
	
	@media all and (max-width:767px) {
		margin-left: -49px;
		${props => {
			if (props.DesignNum === 0) {
				return`
					padding: 1px 7px;
				`
			}
			else {
				return`
		
				`
		}
		}};
	}
`

const PathDesignCircle = styled.div`
	color: #3172F6;
	font-size: 1.2rem;
	font-weight: 900;
	position: relative;
	margin-top: 20px;
	margin-left: 148px;
	`
	
const PathDesignLine = styled.hr`
	display: ${props => props.check ? 'true' : 'none'};
	position: absolute;
	border: 2.5px solid #3172F6;
	top: 0;
	opacity: 1;
	
	@media all and (min-width:768px) {
		width: 214px;
		margin: 11.5px 24px;
	}
	
	@media all and (max-width:767px) {
		width: 172px;
		margin: 11.5px -17px;
	}
`

const CardDiv = styled.div`
	margin-top: 40px;
`

export default CardItem;
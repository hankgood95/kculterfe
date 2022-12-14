import React, {
	useState,
	useEffect,
} from 'react';
import {
	Link,
	useLocation,
} from 'react-router-dom';
import {
	useSelector
} from 'react-redux';
import OffCanvasSidebar from '../../sidebar/offCanvasSidebar/offCanvasSidebar';
import logoBlack from '../../../src_asset/loginblack.png';
import './Header.css';
import map from '../../../src_asset/map.svg';
import mypage from '../../../src_asset/gear.svg';
import noImage from '../../../src_asset/no_img.png';
import concertImg from '../../../src_asset/ticket-detailed.svg';
import kpop from '../../../src_asset/star.svg';
import culture from '../../../src_asset/balloon.svg';

function Header(props) {
	const location = useLocation();
	const [img, setImg] = useState(null);
	const [title, setTitle] = useState(null);
	const [isOpen, setOpen] = useState(true);
	const sideClose = () => setOpen(false);
	const handleOpen = (e) => setOpen(e);
	const idolSelected = useSelector(state => state.idolSelected);
	const attrSelected = useSelector(state => state.attrSelected);
	const concertSelected = useSelector(state => state.concertSelected);
	const dashboardSelected = useSelector(state => state.dashboardSelected);
	const settingSelected = useSelector(state => state.settingSelected);

	useEffect(() => {
		if (location.pathname === "/MapPage") {
			setTitle((title) => "Map");
			setImg((img) => map);
		} else if (location.pathname === "/IdolListPage" && idolSelected) {
			setTitle((title) => "Kpop");
			setImg((img) => kpop);
		} else if (location.pathname === "/IdolListPage" && attrSelected) {
			setTitle((title) => "Culture");
			setImg((img) => culture);
		} else if (location.pathname === "/IdolListPage" && concertSelected) {
			setTitle((title) => "Concert");
			setImg((img) => concertImg);
		} else if (location.pathname === "/Mypage" && dashboardSelected) {
			setTitle((title) => "Dashboard");
			setImg((img) => mypage);
		} else if (location.pathname === "/Mypage" && settingSelected) {
			setTitle((title) => "Setting");
			setImg((img) => mypage);
		} else {
			setTitle((title) => "Error");
			setImg((img) => noImage);
		}
	}, [idolSelected, attrSelected, concertSelected, dashboardSelected, settingSelected, location.pathname]);

	useEffect(() => {
		props.handleOpen(isOpen);
	}, [isOpen])

	return (
		<header>
			<div className='left'>
				<OffCanvasSidebar isOpen={isOpen} sideClose={sideClose} handleOpen={handleOpen}/>
				<img
					className='pageIcon'
					src={img}
					alt='logo'
					onClick={() => {
						setOpen(!isOpen);
					}}
				/>
				<p className='title'>
					{title}
				</p>
			</div>
			<div className='right'>
				<Link to='/'>
					<button className='logo'>
						<img className='logo-img'
							src={logoBlack}
							alt='logo'
						/>
					</button>
				</Link>
			</div>
		</header>
	);
}

export default Header;
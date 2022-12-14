import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
	Link
} from 'react-router-dom';
import { getPin } from '../container/GetPinData';
// css module
import styles from './IdolCard.module.css';
// fonts
import '../../../index.css';

function IdolCard( {keyHash, type, path_photo, title, num_spot, explain, pin}) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	window.sessionStorage.setItem("keyHash", keyHash);
	window.sessionStorage.setItem("title", title);
	window.sessionStorage.setItem("type", type);

	return (
		<>
			<a className={styles.cardLink} onClick={handleShow}>
				<div className={styles.card_container}>
					<div className={styles.image_container}>
						<img src={path_photo} />
						<div className={styles.image_title}>
							<h3>{title}</h3>
						</div>
					</div>
					<div className={styles.card_content}>
						<div className={styles.card_content_pin}>
							{pin && <img src={pin.imageUrl} alt='pin' />}
						</div>
						<div className={styles.card_content_spot}>
							<p>{num_spot}</p>
							<img src='spot.png' />
						</div>
					</div>
				</div>
			</a>

			<Modal 
				className={styles.modal}
				show={show}
				onHide={handleClose}
			>
				<Modal.Header className={styles.modal_header}>
					<img src={path_photo} />
				</Modal.Header>
				<Modal.Body className={styles.modal_body}>
					<div className={styles.modal_title}>
						{title}
						{pin && <img src={pin.imageUrl} alt='pin' />}
					</div>
					<div className={styles.modal_info}>
						<div className={styles.modal_spot_num}>
							<p>{num_spot}</p>
							<img src='spot.png' alt='spot'/>
						</div>
					</div>
					<div className={styles.modal_paragraph}>
						<p>{explain}</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
				<Button variant={styles.modal_secondary} onClick={handleClose}>
					Close
				</Button>
				<Link className={styles.button} to='/MapPage'>
					<Button variant={styles.modal_primary} onClick={handleClose}>
							Find {title} Spots in Map
					</Button>
				</Link>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default IdolCard
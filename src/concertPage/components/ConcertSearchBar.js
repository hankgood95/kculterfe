import React from 'react';
import styles from './ConcertSearchBar.module.css';
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap';

function ConcertSearchBar({search, onChange}) {
	return (
		<>
			{/* <Form>
				<Form.Group className={styles.search_box} controlId="formBasicEmail">
					<Form.Control placeholder="SEARCH" onChange={onChange} />
     			</Form.Group>
			</Form> */}
			<form>
				<input className={styles.no_submit} type="search" placeholder="SEARCH" onChange={onChange}></input>
			</form>
		</>
	)
}
ConcertSearchBar.propTypes = {
	search: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default ConcertSearchBar;
import React from 'react';
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap';
import styles from './IdolSearchBar.module.css';

function IdolSearchBar({search, onChange}) {
	let style = {
		display: "none"
	}
	return (
		<>
			{/* <Form>
				<Form.Group className={styles.search_box} controlId="formBasicEmail">
					<Form.Control placeholder="SEARCH" onChange={onChange} />
     			</Form.Group>
			</Form> */}
			<form>
				{/* to prevent submit when typing enter */}
				<input type="search" style={style}></input>
				<input className={styles.no_submit} type="search" placeholder="SEARCH" onChange={onChange} ></input>
			</form>
		</>
	)
}
IdolSearchBar.propTypes = {
	search: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default IdolSearchBar;
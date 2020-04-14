import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = props => {
	const [state, setState] = useState({
		showModal: false,
		idOnDelete: null
	});
	console.log(props);
	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						<ContactCard onDelete={id => setState({ showModal: true, idOnDelete: id })} />
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				id={state.idOnDelete}
				return={() => props.history.push("/")}
				onClose={() => setState({ showModal: false, idOnDelete: null })}
			/>
		</div>
	);
};

Contacts.propTypes = {
	return: PropTypes.func,
	history: PropTypes.object
};

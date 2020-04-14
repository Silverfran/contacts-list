const url = "https://assets.breatheco.de/apis/fake/contact/";

export const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContact() {
				fetch(url + "agenda/silver_agenda")
					.then(response => response.json())
					.then(result => {
						setStore({
							contacts: result
						});
					})
					.catch(e => console.error(e));
			},
			deleteContact(id) {
				fetch(url + id, { method: "DELETE" })
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch(url + "agenda/silver_agenda")
							.then(response => response.json())
							.then(result => {
								setStore({
									contacts: result
								});
							})
							.catch(e => console.error(e));
					})
					.catch(e => console.error(e));
			},
			addContact(name, address, phone, email) {
				fetch(url, {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "silver_agenda"
					})
				}).then(() => {
					fetch(url + "agenda/silver_agenda")
						.then(response => response.json())
						.then(result => {
							setStore({
								contacts: result
							});
						})
						.catch(e => console.error(e));
				});
			},
			editContact(id, name, address, phone, email) {
				fetch(url + id, {
					method: "PUT",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "silver_agenda"
					})
				}).then(() => {
					fetch(url + "agenda/silver_agenda")
						.then(response => response.json())
						.then(result => {
							setStore({
								contacts: result
							});
						})
						.catch(e => console.error(e));
				});
			}
		}
	};
};

export default getState;

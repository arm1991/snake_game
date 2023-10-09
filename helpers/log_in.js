import { saveData, getData } from "./store.js";

export function logInFunc(store) {
	const { username } = store.domElements;
	if(username.value.trim() !== "") {
		getData(store);
		if(!checkUser(username.value, store)) {
			setData(username.value, Math.floor(Date.now()), store);
			saveData(store);
		}
		setUser(username.value, store);
		changeCSS(store.domElements.logInDiv, store.domElements.fields);
	}
}

function setData(username, id, store) {
	store.data.push({
		id,
		username,
		highScore: 0,
	});
}

function setUser (username, store) {
	let user = store.data.find(user => user.username === username);
	store.currentUser = user.id;
}

function checkUser(username, store) {
	if(store.data && store.data.find(user => user.username === username)) {
		return true;
	}
	return false;
}

function changeCSS(logInDiv, fields) {
	logInDiv.style.display = "none";
	fields.style.display = "flex";
}
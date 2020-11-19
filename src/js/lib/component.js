import Store from "./../store/store.js"; // Import of the store class

export default class Component {
	constructor(props = {}) {
		let self = this;
		this.render = this.render || function () {}; // Creating an empty render method if the class that extends this component class and doesn't provide a render method

		// If there's a store passed in, subscribe to the state change
		if (props.store instanceof Store) {
			props.store.events.subscribe("stateChange", () => self.render());
		}

		// Store the HTML element to attach the render to if set
		if (props.hasOwnProperty("element")) {
			this.element = props.element;
		}
	}
}

import PubSub from "./../lib/pubsub.js";

/**
 * Contains out application state
 */
class Store {
	constructor(params) {
		let self = this;
		self.actions = {};
		self.mutations = {};
		self.status = "resting";
		self.state = {};
		self.events = new PubSub();

		if (params.hasOwnProperty("actions")) {
			self.actions = params.actions;
		}

		if (params.hasOwnProperty("mutations")) {
			self.mutations = params.mutations;
		}
	}
}

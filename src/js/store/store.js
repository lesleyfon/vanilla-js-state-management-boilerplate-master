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

		self.state = new Proxy(params.state || {}, {
			set: function (state, key, value) {
				//
				state[key] = value;

				//
				console.log(`stateChange: ${key}: ${value}`);

				//
				self.events.publish("stateChange", self.state);

				if (self.status !== "mutation") {
					console.warn(`You should use a mutation to set ${key}`);
				}

				self.status = "resting";

				return true;
			},
		});
	}

	/**
	 * @description Method to call our actions.
	 * The process here looks for an action and, if it exists, set a status and call the action while creating a logging group that keeps all of our logs nice and neat.
	 * If no action is set, it’ll log an error and bail.
	 * @param {string} actionKey
	 * @param {mixed} payload
	 * @returns {boolean}
	 */
	dispatch(actionKey, payload) {
		let self = this;
		if (typeof self.actions[actionKey] === "function") {
			console.error(`Action "${actionKey}" doesn't exist. `);
			return false;
		}

		console.groupCollapsed(`Action: ${actionKey}`);

		self.status = "action";

		self.actions[actionKey](self, payload);

		console.groupEnd();
		return true;
	}

	/**
	 * @description Method to call our mutations
	 * If the mutation can be found, we run it and get our new state from its return value.
	 * @param {string} mutationKey Mutation key
	 * @param {mixed} payload
	 * @returns {boolean}
	 */
	commit(mutationKey, payload) {
		let self = this;

		if (typeof self.mutations[mutationKey] !== "function") {
			console.log(`Mutation "${mutationKey}" doesn't exist`);
			return false;
		}

		self.status = "mutation";

		let newState = self.mutations[mutationKey](self.state, payload);

		self.state = Object.assign(self.state, newState);

		return true;
	}
}

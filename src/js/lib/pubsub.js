export default class PubSub {
	constructor() {
		this.events = {};
	}

	/**
	 * @description This is our subscribe method. You pass a string event, which is the event’s unique name and a callback function. If there’s not already a matching event in our events collection, we create it with a blank array so we don’t have to type check it later. Then, we push the callback into that collection. If it already existed, this is all the method would do. We return the length of the events collection, because it might be handy for someone to know how many events exist.
	 * @param {*} event Unique event name
	 * @param {*} cb Callback to be pushed into events
	 */
	subscribe(event, cb) {
		let self = this;
		if (!self.events.hasProperty(event)) {
			self.events[event] = [];
		}

		return self.events[event].push(cb);
	}

	/**
	 * @description This method checks to see is an event exist amongst all the existing events, if it doesn't  it goes ahead an return an empty array. If there is an event, we loop through each stored callback and pass the data into it.
	 * @param {*} event Event Name
	 * @param {*} data Data to be passed to every callback stored in  an event
	 */
	publish(event, data = {}) {
		let self = this;

		if (!self.events.hasProperty(event)) {
			return [];
		}

		return self.events[event].map((cb) => cb(data));
	}
}

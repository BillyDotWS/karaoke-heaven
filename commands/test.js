/* eslint-disable no-unused-vars */
const config = require('../settings/config.json');
const punishmentconfig = require('../settings/punishments.json');
const Discord = require('discord.js');
const eventhandler = require('../API/eventHandler.js');

module.exports = {
	name: 'test',
	description: 'Testing testing 123',
	usage: 'test',
	example: 'test',
	requiredRoles: [],
	allowedUsers: ['281199286765748225'],
	argsNeeded: 0,
	async execute(client, message, args) {
		
		for(event in eventlist) {
			const eventlist = await eventhandler.list()
			console.log(eventlist[event])
		}

	},
};

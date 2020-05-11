/* eslint-disable no-unused-vars */
const config = require('../settings/config.json');
const punishmentconfig = require('../settings/punishments.json');
const Discord = require('discord.js');
const eventhander = require('../API/eventHander.js');

module.exports = {
	name: 'test',
	description: 'Testing testing 123',
	usage: 'test',
	example: 'test',
	requiredRoles: [],
	allowedUsers: ['281199286765748225'],
	argsNeeded: 1,
	async execute(client, message, args) {
		
		const event = {

			title: `Billy's amazing event`,
			description: `an amazing event from billy`,
			start: 1589232051,
			end: 1589232053,
			hosts: ["281199286765748225"],
			category: `Official`,
			maxslots: 30,
			slotsperperson: 1,
			theme: `Yite`,
			auctions: true,
			premium: false
	
		}

		const diditwork = eventhander.create(event)
		message.reply("uwu sent. response: ${diditwork.eventid}")

	},
};

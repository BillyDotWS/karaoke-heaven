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
		
		const event = {

			id: "mOFbQldx",
			title: `Billy's amazing event`,
			description: `an amazing event from billy, which has been edited using bot magic and was updated via the update function`,
			start: 1589232051,
			end: 1589232053,
			hosts: ["281199286765748225"],
			category: `Official`,
			maxslots: 30,
			slotsperperson: 1,
			theme: `An updated theme`,
			auctions: true,
			embedid: "709600196794777682",
			premium: false

		}

		const diditwork = await eventhandler.modify(event)
		message.reply(`uwu sent. response: ${diditwork.reason}`)

	},
};

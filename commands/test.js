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

			title: `A really cool event`,
			description: `an amazing event from billy, which has been edited using bot magic and was updated via the update function an amazing event from billy, which has been edited using bot magic and was updated via the update function`,
			start: 1590509700,
			end: 1589232053,
			hosts: ["281199286765748225"],
			category: `Community`,
			maxslots: 30,
			slotsperperson: 1,
			theme: `An updated theme`,
			auctions: true,
			premium: false

		}

		const diditwork = await eventhandler.create(event)
		message.reply(`uwu sent. response: ${diditwork.reason}`)

	},
};

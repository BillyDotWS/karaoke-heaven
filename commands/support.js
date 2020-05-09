const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');
const config = require('../settings/config.json');
const punishmenthandler = require('../API/punishmentHandler.js');
const embeds = require('../modules/embeds.js');

module.exports = {
	name: 'support',
	description: 'Get help from the staff',
	usage: 'support [reason]',
	example: 'support I need a new api key',
	requiredRoles: ['@everyone'],
	allowedUsers: [],
	argsNeeded: 1,
	async execute(client, message, args) {

		// Ticket Number ID Settings
		let ticketNumberID = message.guild.id;
			
		// Ticket Subject Settings
		const subject = args.join(" ") || `New ticket`;

	
		// Ticket Creation
			if (message.guild.channels.cache.find(TicketChannel => TicketChannel.name === `ticket-` + message.author.username)) return message.channel.send(`You already have a ticket open!`);
				message.guild.channels.create(`ticket-${ticketNumberID}`, {
				type: 'text',
			}).then(TicketChannel => {
			
		// Roles
			let staff = message.guild.roles.cache.find(supportRole => supportRole.name === `🌈 Support`)
			let everyone = message.guild.roles.cache.get(`700208007530676314`)
			let botrole = message.guild.roles.cache.get(`700211769561579560`)

		// Permissions

			TicketChannel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
			TicketChannel.updateOverwrite(message.author, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: false, READ_MESSAGES: true });
			TicketChannel.updateOverwrite(staff, { VIEW_CHANNEL: true, CREATE_INVITE: false, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });
			TicketChannel.updateOverwrite(botrole, { ADMINISTRATOR: true, VIEW_CHANNEL: true, CREATE_INVITE: false, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });
	
			// Category
		let category = message.guild.channels.cache.find(c => c.name === "🎫 Tickets & Punishments");
			if (category) {
				TicketChannel.setParent(category.id);
			} else {
				if (message.guild.channels.cache.get(supportbot.category)) {
					TicketChannel.setParent(message.guild.channels.cache.get(supportbot.category).id);
				}
			}
			
		const ticketopened = new Discord.MessageEmbed()
			.setTitle(":white_check_mark: Support Ticket Created")
			.setDescription(`<@${message.author.id}> your support ticket created successfully`)
			.addField("Your Ticket:", `<#${TicketChannel.id}>`)
			.setColor('#FFC0CB');
		message.channel.send({embed: ticketopened});
		// Ticket Message - ( Able to edit this message via the settings.json file )
		TicketChannel.send(`<@&700217828870979644>`)
		const ticketMessage = `:ticket: **New ticket by <@${message.author.id}>**\nWhat do you need help with today? Please ensure to include as much detail as possible so we are able to help you. Please ensure that your question isn't answered elsewhere. We have resources for commonly asked questions, these can be found below.\n\n:link: **Useful Links**\n:white_medium_small_square: [Events List](${config.domain}/events)\n:white_medium_small_square: [Bouncer Applications](${config.domain}/bouncerapplications)\n:white_medium_small_square: [Host your own event](${config.domain}/events)\n:white_medium_small_square: [Manage your balance](${config.domain}/bank\n\n:rainbow: **Ticket reason:**\n${subject}`;


		const TicketMessage = new Discord.MessageEmbed()
			.setDescription(ticketMessage, true)
			.setColor('#FFC0CB')
			

		TicketChannel.send({embed: TicketMessage}).then(function(msg) {

			TicketChannel.updateOverwrite(message.author, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });
			TicketChannel.updateOverwrite(staff, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });

		
		});


		
		}).catch(err=>{console.error(err)});
	



  	},

};

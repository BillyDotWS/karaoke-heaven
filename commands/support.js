const Discord = require('discord.js');
const punishmentconfig = require('../settings/punishments.json');
const config = require('../settings/config.json');
const punishmenthandler = require('../API/punishmentHandler.js');
const embeds = require('../modules/embeds.js');

module.exports = {
	name: 'support',
	description: 'Get server support',
	usage: 'support [reason]',
	example: 'support New api key',
	requiredRoles: ['@everyone'],
	allowedUsers: [],
	argsNeeded: 1,
	async execute(client, message, args) {

		// Ticket Number ID Settings
		let ticketNumberID = TicketNumberID.pad(message.guild.id);
			
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

		// Permissions
			TicketChannel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
			TicketChannel.updateOverwrite(message.author, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: false, READ_MESSAGES: true });
			TicketChannel.updateOverwrite(staff, { VIEW_CHANNEL: true, CREATE_INVITE: false, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });
	
			// Category
		let category = message.guild.channels.cache.find(c => c.name === "🎫 Tickets & Punishments");
			if (category) {
				TicketChannel.setParent(category.id);
			} else {
				if (message.guild.channels.cache.get(`700214247661109268`)) {
					TicketChannel.setParent(message.guild.channels.cache.get(`700214247661109268`).id);
				}
			}
			
		const ticketopened = new Discord.MessageEmbed()
			.setTitle(":white_check_mark: Support Ticket Created")
			.setDescription(`<@${message.author.id}> your support ticket created successfully`)
			.addField("Your Ticket:", `<#${TicketChannel.id}>`)
			.setColor('#FFC0CB');
		message.channel.send({embed: ticketopened});
		// Ticket Message - ( Able to edit this message via the settings.json file )
		const ticketMessage = `Hi! <@${message.author.id}>\nHow can we help you?`;


		const TicketMessage = new Discord.MessageEmbed()
			.setDescription(ticketMessage, true)
			.setColor('#FFC0CB')

			if (subject != 'No Subject.') {
				TicketMessage.addField("Reason", subject);
			}
			

		TicketChannel.send({embed: TicketMessage}).then(function(msg) {

			TicketChannel.updateOverwrite(message.author, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });
			TicketChannel.updateOverwrite(staff, { VIEW_CHANNEL: true, CREATE_INVITE: false, SEND_MESSAGES: true, READ_MESSAGES: true });

		
		});

		// Ticket Logging

		if (subject != 'No Subject.') {
			logEmbed.addField('Subject', subject, true);
		}
		
		}).catch(err=>{console.error(err)});
	



  	},

};

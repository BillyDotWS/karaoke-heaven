const Discord = require('discord.js')

module.exports.infoEmbed = class {
    constructor(type, channel, description, personToTag, timer) {
        this.channel = channel
        this.description = description
        this.personToTag = personToTag
        this.timer = timer
        switch(type) {
            case 'success':
                this.embedColour = "#22ff00"
                this.embedEmoji = "✅"
                break
            case 'error':
                this.embedColour = "#ff0000"
                this.embedEmoji = "❌"
                break
            case "warning":
                this.embedColour = "#f2ff00"
                this.embedEmoji = "⚠"
                break
            case "working":
                this.embedColour = "#f2ff00"
                this.embedEmoji = "🛠"
                break
        }
    }

    async sendEmbed() {
        var infoEmbed = new Discord.MessageEmbed()
            .setColor(this.embedColour)
            .setDescription(`${this.embedEmoji} » ${this.description}`)
        if (this.timer === null) {
            if (this.personToTag === null) this.embedPlaceholder = await this.channel.send(infoEmbed)
            else this.embedPlaceholder = await this.channel.send(this.personToTag, infoEmbed)
        } else {
            if (this.personToTag === null) this.embedPlaceholder = await this.channel.send(infoEmbed).then(msg => msg.delete({timeout: this.timer * 1000}))
            else this.embedPlaceholder = await this.channel.send(this.personToTag, infoEmbed).then(msg => msg.delete({timeout: this.timer * 1000}))
        }
        return this.embedPlaceholder
    }

    editEmbed() {
        var infoEmbed = new Discord.MessageEmbed()
            .setColor(this.embedColour)
            .setDescription(`${this.embedEmoji} » ${this.description}`)
        if (this.timer === null) {
            if (this.personToTag === null) this.channel.edit(infoEmbed)
            else this.channel.edit(this.personToTag, infoEmbed)
        } else {
            if (this.personToTag === null) this.channel.edit(infoEmbed).then(msg => msg.delete({timeout: this.timer * 1000}))
            else this.channel.edit(this.personToTag, infoEmbed).then(msg => msg.delete({timeout: this.timer * 1000}))
        }
    }
}

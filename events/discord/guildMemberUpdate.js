module.exports = async (client, oldMember, newMember) => {

	// declare changes
	var Changes = {
	  unknown: 0,
	  addedRole: 1,
	  removedRole: 2,
	  username: 3,
	  nickname: 4,
	  avatar: 5
	}
	var change = Changes.unknown
  
	// check if roles were removed
	var removedRole = ''
	oldMember.roles.every(function (value) {
	  if (newMember.roles.find('id', value.id) == null) {
		change = Changes.removedRole
		removedRole = value.name
	  }
	})
  
	// check if roles were added
	var addedRole = ''
	newMember.roles.every(function (value) {
	  if (oldMember.roles.find('id', value.id) == null) {
		change = Changes.addedRole
		addedRole = value.name
	  }
	})
  
	// check if username changed
	if (newMember.user.username != oldMember.user.username) {
	  change = Changes.username
	}
	// check if nickname changed
	if (newMember.nickname != oldMember.nickname) {
	  change = Changes.nickname
	}
	// check if avatar changed
	if (newMember.user.avatarURL != oldMember.user.avatarURL) {
	  change = Changes.avatar
	  
	}
    switch (change) {
		case Changes.unknown:
		  break
		case Changes.addedRole:
		  newMember.send(`You were added to the \`${addedRole}\` role!`)
		  break
		case Changes.removedRole:
			newMember.send(`You were removed from the \`${removedRole}\` role!`)
			break
		case Changes.username:
		  break
		case Changes.nickname:
		  break
		case Changes.avatar:
		  break
	}
	
  };

module.exports = (client) => {

	// It's easier to deal with complex paths.
	// This resolves to: yourbotdir/dashboard/
	const dataDir = path.resolve(`${process.cwd()}${path.sep}website`);

	// This resolves to: yourbotdir/dashboard/templates/
	// which is the folder that stores all the internal template files.
	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	app.set('trust proxy', 5); // Proxy support
	// The public data directory, which is accessible from the *browser*.
	// It contains all css, client javascript, and images needed for the site.
	app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`), { maxAge: '10d' }));
	app.use(morgan('combined')); // Logger

	// uhhhh check what these do.
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});

	/*
	This defines the **Passport** oauth2 data. A few things are necessary here.

	clientID = Your bot's client ID, at the top of your app page. Please note,
		older bots have BOTH a client ID and a Bot ID. Use the Client one.
	clientSecret: The secret code at the top of the app page that you have to
		click to reveal. Yes that one we told you you'd never use.
	callbackURL: The URL that will be called after the login. This URL must be
		available from your PC for now, but must be available publically if you're
		ever to use this dashboard in an actual bot.
	scope: The data scopes we need for data. identify and guilds are sufficient
		for most purposes. You might have to add more if you want access to more
		stuff from the user. See: https://discordapp.com/developers/docs/topics/oauth2

	See config.js.example to set these up.
	*/

	var protocol;
	client.protocol = 'http://';

	protocol = client.protocol;

	client.callbackURL = `${protocol}${config.domain}/callback`;
	client.log('log', `Callback URL: ${client.callbackURL}`, 'INFO');
	passport.use(new Strategy({
		clientID: credentials.clientid,
		clientSecret: credentials.clientsecret,
		callbackURL: client.callbackURL,
		scope: ['identify', 'guilds']
	},
	(accessToken, refreshToken, profile, done) => {
		process.nextTick(() => done(null, profile));
	}));


	// Session data, used for temporary storage of your visitor's session information.
	// the `secret` is in fact a 'salt' for the data, and should not be shared publicly.
	app.use(session({
		secret: credentials.sessionsecret,
		resave: false,
		saveUninitialized: false,
	}));

	// Initializes passport and session.
	app.use(passport.initialize());
	app.use(passport.session());

	// The domain name used in various endpoints to link between pages.
	app.locals.domain = config.domain;

	// The EJS templating engine gives us more power
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	// body-parser reads incoming JSON or FORM data and simplifies their
	// use in code.
	var bodyParser = require('body-parser');
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));

	/*
	Authentication Checks. checkAuth verifies regular authentication,
	whereas checkAdmin verifies the bot owner. Those are used in url
	endpoints to give specific permissions.
	*/
	function checkAuth(req, res, next) {
		if (req.isAuthenticated()) return next();
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function cAuth(req, res) {
		if (req.isAuthenticated()) return;
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function checkAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.id === config.ownerID) return next();
		req.session.backURL = req.originalURL;
		res.redirect('/');
	}


	// Index page. If the user is authenticated, it shows their info
	// at the top right of the screen.
	app.get('/', (req, res) => {
		if (req.isAuthenticated()) {
			res.render(path.resolve(`${templateDir}${path.sep}index.ejs`), {
				bot: client,
				auth: true,
				user: req.user
			});
		} else {
			res.redirect('/login');
		}
	});


	//app.get('/stats', (req, res) => {
	//	if (client.config.dashboard.protectStats === 'true') {
	//		cAuth(req, res);
	//	}
	//	const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	//	//const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
	//	const members = `${client.users.filter(u => u.id !== '1').size} (${client.users.filter(u => u.id !== '1').filter(u => u.bot).size} bots)`;
	//	const textChannels = client.channels.filter(c => c.type === 'text').size;
	//	const voiceChannels = client.channels.filter(c => c.type === 'voice').size;
	//	const guilds = client.guilds.size;
	//	res.render(path.resolve(`${templateDir}${path.sep}stats.ejs`), {
	//		bot: client,
	//		auth: req.isAuthenticated() ? true : false,
	//		user: req.isAuthenticated() ? req.user : null,
	//		stats: {
	//			servers: guilds,
	//			members: members,
	//			text: textChannels,
	//			voice: voiceChannels,
	//			uptime: duration,
	//			commands: client.commandsNumber,
	//			memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
	//			dVersion: Discord.version,
	//			nVersion: process.version,
	//			bVersion: client.version
	//		}
	//	});
	//});


	// The login page saves the page the person was on in the session,
	// then throws the user to the Discord OAuth2 login page.
	app.get('/login', (req, res, next) => {
		if (req.session.backURL) {
			req.session.backURL = req.session.backURL;
		} else if (req.headers.referer) {
			const parsed = url.parse(req.headers.referer);
			if (parsed.hostname === app.locals.domain) {
				req.session.backURL = parsed.path;
			}
		} else {
			req.session.backURL = '/';
		}
		next();
	},
	passport.authenticate('discord'));

	app.get('/callback', passport.authenticate('discord', {
		failureRedirect: '/'
	}), (req, res) => {
		if (req.session.backURL) {
			res.redirect(req.session.backURL);
			req.session.backURL = null;
		} else {
			res.redirect('/');
		}
	});

	app.get('/admin', checkAdmin, (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}admin.ejs`), {
			bot: client,
			user: req.user,
			auth: true
		});
	});

	app.get('/index', checkAuth, (req, res) => {
		const perms = Discord.EvaluatedPermissions;
		res.render(path.resolve(`${templateDir}${path.sep}index.ejs`), {
			perms: perms,
			bot: client,
			user: req.user,
			auth: true
		});
	});

	app.get('/404', checkAuth, (req, res) => {
		const perms = Discord.EvaluatedPermissions;
		res.render(path.resolve(`${templateDir}${path.sep}404.ejs`), {
			perms: perms,
			bot: client,
			user: req.user,
			auth: true
		});
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('*', function(req, res) { // Catch-all 404
		res.redirect('/404');
	});

	client.site = app.listen(config.port, function() {
		client.log('log', `Dashboard running on port ${config.port}`, 'INFO');
	}).on('error', (err) => {
		client.log('ERROR', `Error with starting dashboard: ${err.code}`);
		return process.exit(0);
	});
};

// BASE SETUP
// =============================================================================

// call the packages we need
import express from 'express';
import bodyParser from 'body-parser';
import pm2 from 'pm2';

const app   = express();
const port  = process.env.PORT || 4000; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// middleware to use for all requests
router.use((req, res, next) => {
	console.log(`[${req.method}] ${req.originalUrl}`);
	next();
});

router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!', port:process.env.PORT });
});

router.post('/process', (req, res) => {
	const procName = req.body.name;
	const port = parseInt(req.body.port);
	const error_file = `logs/${procName}.err.log`;
	const out_file = `logs/${procName}.out.log`;

	pm2.connect((err) => {
	  if (err) {
			res.status(500).json({
				msg: '[pm2.connect] Error is ocurred.',
				detail: err.toString()
			});
			return;
	  }

	  pm2.start({
			"apps": [
		    {
		      "exec_mode": "fork_mode",
		      "script": "./dist/main.js",
		      "name": procName,
		      "node_args": [ "--harmony" ],
		      "env": {
		        "PORT": port,
		        "NODE_ENV": app.get('env')
		      },
		      "error_file": error_file,
		      "out_file": out_file
		    }
		  ]
	  }, (err, apps) => {
			console.log("pm2 start");
	    pm2.disconnect();   // Disconnect from PM2
	    if (err) {
				res.status(500).json({
					msg: '[pm2.start] Error is ocurred.',
					detail: err.toString()
				});
			} else {
				const services = [];
				apps.forEach(service => {
					services.push({
						name: service.pm2_env.name,
						port: service.pm2_env.PORT,
						pm_id: service.pm2_env.pm_id,
						pid: service.pid
					});
				});
				res.status(200).json(services);
			}
	  });
	});
});

router.get('/process', (req, res) => {
	pm2.connect((err) => {
		if (err) {
			res.status(500).json({
				msg: '[pm2.connect] Error is ocurred.',
				detail: err.toString()
			});
			return;
	  }

	  pm2.list((err, processDescriptionList) => {
			pm2.disconnect();
			if(err) {
				res.status(500).json({
					msg: '[pm2.list] Error is ocurred.',
					detail: err.toString()
				});
			} else {
				const services = [];
				processDescriptionList.forEach(service => {
					services.push({
						name: service.name,
						port: service.pm2_env.PORT,
						pm_id: service.pm_id,
						pid: service.pid
					});
				});
				res.status(200).json(services);
			}
		});
	});
});

router.put('/process/stop', (req, res) => {
	const pm_id = parseInt(req.body.pm_id);

	pm2.connect((err) => {
		if (err) {
			res.status(500).json({
				msg: '[pm2.connect] Error is ocurred.',
				detail: err.toString()
			});
			return;
		}
		pm2.stop(pm_id, (err, proc) => {
			pm2.disconnect();
			if(err) {
				res.status(500).json({
					msg: '[pm2.stop] Error is ocurred.',
					detail: err.toString()
				});
			} else {
				res.status(200).json(proc);
			}
		});
	});
});

router.put('/process/start', (req, res) => {
	const pm_id = req.body.pm_id;

	pm2.connect((err) => {
		if (err) {
			res.status(500).json({
				msg: '[pm2.connect] Error is ocurred.',
				detail: err.toString()
			});
			return;
		}
		pm2.start(pm_id, (err, proc) => {
			pm2.disconnect();
			if(err) {
				res.status(500).json({
					msg: '[pm2.start] Error is ocurred.',
					detail: err.toString()
				});
			} else {
				res.status(200).json(proc);
			}
		});
	});
});

router.put('/process/restart', (req, res) =>{
	const pm_id = req.body.pm_id;

	pm2.connect((err) => {
		if (err) {
			res.status(500).json({
				msg: '[pm2.connect] Error is ocurred.',
				detail: err.toString()
			});
			return;
		}
		pm2.restart(pm_id, (err, proc) => {
			pm2.disconnect();
			if(err) {
				res.status(500).json({
					msg: '[pm2.restart] Error is ocurred.',
					detail: err.toString()
				});
			} else {
				res.status(200).json(proc);
			}
		});
	});
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

process.on('SIGINT', function() {
   console.log('------------------------------ SIGINT');
	 var fs = require('fs');
		fs.writeFile("./greenfrog.hello.test", "Hey there!", function(err) {
		    if(err) {
						process.exit(err ? 1 : 0);
		    }

		    console.log("The file was saved!");
				process.exit(0);
		});

});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

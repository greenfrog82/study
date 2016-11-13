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
	// do logging
	console.log('Something is happening.');
	next();
});

router.get('/', (req, res) => {
	console.log("test");
	res.json({ message: 'hooray! welcome to our api!', port:process.env.PORT });
});

router.post('/pm2', (req, res) => {
	console.log("--- /pm2");

	const procName = req.body.name;
	const port = parseInt(req.body.port);
	const error_file = `logs/${procName}.err.log`;
	const out_file = `logs/${procName}.out.log`;

	pm2.connect((err) => {
	  if (err) {
	    console.error(err);
	    process.exit(2);
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
	  }, function(err, apps) {
			console.log("pm2 start");
			// TODO Why does it call that the follow code?
	    pm2.disconnect();   // Disconnect from PM2
	    if (err) {
				res.status(500).json({
					msg: 'Error is ocurred.',
					detail: err
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

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

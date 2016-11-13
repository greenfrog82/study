// BASE SETUP
// =============================================================================

// call the packages we need
import express from 'express';
import pm2 from 'pm2';

const app   = express();
const port  = process.env.PORT || 4000; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router();

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

router.get('/pm2', (req, res) => {
	console.log("pm2");

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
		      "name": "proj-0",
		      "node_args": [ "--harmony" ],
		      "env": {
		        "PORT": 4001,
		        "NODE_ENV": "production"
		      },
		      "error_file": "logs/proj-0.err.log",
		      "out_file": "logs/proj-0.out.log"
		    },
		    {
		      "exec_mode": "fork_mode",
		      "script": "./dist/main.js",
		      "name": "proj-1",
		      "node_args": [ "--harmony" ],
		      "env": {
		        "PORT": 4002,
		        "NODE_ENV": "production"
		      },
		      "error_file": "logs/proj-1.err.log",
		      "out_file": "logs/proj-1.out.log"
		    }
		  ]
	  }, function(err, apps) {
			console.log("pm2 start");
	    pm2.disconnect();   // Disconnect from PM2
	    if (err) throw err;
	  });
	});


	res.json({ message: 'pm2 test!!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

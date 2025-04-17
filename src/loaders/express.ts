import bodyParser from 'body-parser';
import cors from 'cors';
// import methodOverride from 'method-override';
import morgan from 'morgan';
import HttpStatus from 'http-status-codes';
import apiRouter from '../api/index'
// import Response from '../utilities/Response';
// import router from '../api';
import { Application, Request, Response as ExpressResponse, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
	status?: number;
	code?: number;
	extra?: any;
}

export default ({ app }: { app: Application }) => {
	/*
		|--------------------------------------------------------------------------
		| Heroku, Bluemix, AWS ELB, Nginx, etc
		|--------------------------------------------------------------------------
		|
		| Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
		| It shows the real origin IP in the heroku or Cloudwatch logs
		|
		*/
	app.enable('trust proxy');

	// HTTP request logger
	app.use(morgan('dev'));

	// The magic package that prevents frontend developers going nuts
	// Alternate description:
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors({ origin: '*' }));

	// Some sauce that always add since 2014
	// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
	// Maybe not needed anymore ?
	// app.use(methodOverride());

	// Middleware that transforms the raw string of req.body into json
	app.use(bodyParser.json({ limit: '100mb', type: 'application/json' }));

	// Load API routes
	apiRouter(app);

	// catch 404 and forward to error handler
	app.use((req: Request, res: ExpressResponse, next: NextFunction) => {
		const err: ErrorWithStatus = new Error(`Route ${req.url} Not Found`);
		// err.status = HttpStatus.StatusCodes.NOT_FOUND;
		next(err);
	});

	// error handlers
	app.use((err: ErrorWithStatus, req: Request, res: ExpressResponse, next: NextFunction) => {
		/*
		 * Handle 401 thrown by express-jwt library
		 */
		if (err.name === 'UnauthorizedError') {
			// return Response.fail(res, err.message, err.status);
		}

		/*
		 * Handle multer error
		 */
		if (err.name === 'MulterError') {
			// return Response.fail(res, err.message, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
		}
		// return Response.fail(res, err.message, err.code || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, null, err.extra);
	});

	app.use((err: ErrorWithStatus, req: Request, res: ExpressResponse) => {
		// res.status(err.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});
};
import bodyParser from 'body-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import adminRoutes from '../packages/admin/v1/index';
import { Application, Response as ExpressResponse, NextFunction, Request } from 'express';
import config from '../config';
import { CustomResponse } from '../lib/api-response';

interface ErrorWithStatus extends Error {
	status?: number;
	code?: number;
	extra?: any;
}
const ADMIN_BASE_URL = `/api/${config.api_version.admin}/admin` 
const APP_BASE_URL = `/api/${config.api_version.app}/app` 
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
	app.use(ADMIN_BASE_URL, adminRoutes)

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
			return CustomResponse.fail({ res, message: err.message, code: StatusCodes.INTERNAL_SERVER_ERROR });

		}

		/*
		 * Handle multer error
		 */
		if (err.name === 'MulterError') {
			// return Response.fail(res, err.message, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
			return CustomResponse.fail({ res, message: err.message, code: StatusCodes.INTERNAL_SERVER_ERROR });
		}
		return CustomResponse.fail({ res, message: err.message, code: err.code || StatusCodes.NOT_FOUND, data: {}, extra: err.extra });
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
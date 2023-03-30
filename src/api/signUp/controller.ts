import { Request, Response, Router } from 'express';
import * as yup from 'yup';

import { validate } from '../../middlewares';

import {signUpService} from './service';
import { ApplicationError } from '../../middlewares/errors';

const schema = yup.object({
	fullName: yup.string().required('Full name is required'),
	email: yup.string().email('Please provide a valid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/signup', validate(schema), async (req: Request, res: Response) => {
	console.log('req', req.body);
	try {
		await signUpService(req.body);

		return res
			.status(201)
			.json({
				message: 'Account created',
				status: 201,
				data: {
					email: req.body.email,
					fullName: req.body.fullName
				}
			});
	} catch (error) {
		if (error instanceof ApplicationError) {
			return res.status(error.status).json(error).end();
		}
	}
});

export default router;

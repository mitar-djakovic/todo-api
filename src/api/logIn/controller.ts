import { Request, Response, Router } from 'express';
import * as yup from 'yup';

import { validate } from '../../middlewares';
import { ApplicationError } from '../../middlewares/errors';

import { loginService } from './services';

const schema = yup.object({
	email: yup.string().email().required('Email is required'),
	password: yup.string()
		.min(6, 'Minimum amount of character is 6')
		.max(30, 'Maximum amount of character is 30')
		.required('Password is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/login', validate(schema), async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const response = await loginService(req.body);
		
		return res.status(200).json({
			message: 'Logged in successfully!',
			status: 200,
			data: response
		});
	} catch (error) {
		if (error instanceof ApplicationError) {
			res.status(error.status).json(error).end();
		} else {
			res.status(500).json({ message: 'Something went wrong!'});
		}
	}
});

export default router;
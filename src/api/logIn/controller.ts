import { Request, Response, Router } from 'express';
import { object,string } from 'yup';

import { validate } from '../../middlewares';
import { ApplicationError } from '../../middlewares/errors';

import { loginService } from './services';

const schema = object({
	email: string().email().required('Email is required'),
	password: string()
		.min(6, 'Minimum amount of character is 6')
		.max(30, 'Maximum amount of character is 30')
		.required('Password is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/login', validate(schema), async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const response = await loginService(email, password);
		
		return res
			.status(200)
			.json({
				message: 'Logged in successfully!',
				status: 200,
				data: response
			})
			.end();
	} catch (error) {
		if (error instanceof ApplicationError) {
			res.status(error.status).json(error).end();
		} else {
			res.status(500).json({ message: 'Something went wrong!'});
		}
	}
});

export default router;
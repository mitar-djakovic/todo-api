import { Request, Response, Router } from 'express';
import * as yup from 'yup';

import { validate } from '../../middlewares';
import { ApplicationError } from '../../middlewares/errors';

import { createTodoService } from './servicess';

const schema = yup.object({
	listId: yup.string().required('List id is required'),
	todo: yup.string()
		.min(1, 'Minimum amount of character is 1')
		.max(30, 'Maximum amount of character is 30')
		.required('Todo is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/todo', validate(schema), async (req: Request, res: Response) => {
	console.log('req', req.body);
	try {
		await createTodoService(req.body);

		return res.status(200).json({
			status: 200,
			data: {
				todo: req.body.todo,
				completed: false,
			},
			message: 'Todo is created'
		});
	} catch (error) {
		if (error instanceof ApplicationError) {
			res.status(error.status).json(error).end();
		} else {
			res.status(500).json({ message: 'Something went wrong!'}).end();
		}
	}
});

export default router;
import { Request, Response, Router } from 'express';
import * as yup from 'yup';

import { validate } from '../../middlewares';
import { ApplicationError } from '../../middlewares/errors';

import { updateTodoService } from './service';

const schema = yup.object({
	checked: yup.boolean().required('Task status is required'),
	position: yup.number().min(0).required('Todo is required'),
	listId: yup.string().required('List id is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.patch('/todo', validate(schema), async (req: Request, res: Response) => {
	console.log('req', req.body);
	const { listId, checked, position} = req.body;
	try {
		await updateTodoService(listId, checked, position);

		return res.status(200).json({
			status: 200,
			data: {
				completed: checked,
				listId,
				position,
			},
			message: 'Todo is updated'
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
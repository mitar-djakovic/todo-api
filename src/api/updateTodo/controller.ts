import { Request, Response, Router } from 'express';
import { boolean, object, string} from 'yup';

import { validate } from '../../middlewares';
import { ApplicationError } from '../../middlewares/errors';

import { updateTodoService } from './service';

const schema = object({
	checked: boolean().required('Task status is required'),
	todoId: string().required('Todo id is required'),
	listId: string().required('List id is required'),
});

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.patch('/todo', validate(schema), async (req: Request, res: Response) => {
	const { listId, checked, todoId} = req.body;
	try {
		await updateTodoService(listId, checked, todoId);

		return res.status(200).json({
			status: 200,
			data: {
				completed: checked,
				listId,
				todoId,
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
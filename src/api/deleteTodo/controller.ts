import { Request, Response, Router } from 'express';

import { ApplicationError } from '../../middlewares/errors';

import { deleteTodoService } from './service';

const router = Router();

router.delete('/todo/:listId/:position', async (req: Request, res: Response) => {
	try {
		const { listId, position} = req.params;
		await deleteTodoService(listId, position);

		console.log('list', listId, position);

		return res.status(200).json({
			status: 200,
			data: {
				position
			},
			message: 'Todo is deleted'
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
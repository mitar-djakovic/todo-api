import { Request, Response, Router } from 'express';

import { ApplicationError } from '../../middlewares/errors';

import { getTodosService } from './servicess';

const router = Router();

router.get('/todos/:listId', async (req: Request, res: Response) => {
	try {
		console.log('param', req.query);
		const { filter } = req.query;
		const { listId } = req.params;
		
		const response = await getTodosService(listId, filter);
	
		console.log('--------', response);
		return res.status(200).json({
			status: 200,
			data: response
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
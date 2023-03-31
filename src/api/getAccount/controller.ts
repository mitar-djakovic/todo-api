import { Request, Response, Router } from 'express';

import { ApplicationError } from '../../middlewares/errors';

import { getAccountService } from './services';

const router = Router();

router.get('/account/:accountId', async (req: Request, res: Response) => {
	try {
		const { accountId } = req.params;
		const response = await getAccountService(accountId);

		return res.status(200)
			.json({
				status: 200,
				data: response
			})
			.end();
	} catch (error) {
		if (error instanceof ApplicationError) {
			res.status(error.status).json(error).end();
		} else {
			res.status(500).json({ message: 'Something went wrong!'}).end();
		}
	}
});

export default router;
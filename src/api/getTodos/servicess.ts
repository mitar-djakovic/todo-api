import { Prisma } from '@prisma/client';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

export const getTodosService = async (listId: string) =>{
	try {
		return await prisma.todos.findUniqueOrThrow({
			where: {
				id: listId
			}
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				throw new ApplicationError('Todo list not found!', 404);
			}
		} else {
			throw new ApplicationError('Something went wrong', 500);
		}
	}
};
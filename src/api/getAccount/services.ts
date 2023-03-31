import { Prisma } from '@prisma/client';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

export const getAccountService = async (accountId: string) => {
	try {
		const account = await prisma.account.findUniqueOrThrow({
			where: {
				id: accountId
			}
		});

		const todoList = await prisma.todos.findUniqueOrThrow({
			where: {
				accountId: account.id
			}
		});
		
		return {
			accountId,
			listId: todoList.id
		};
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
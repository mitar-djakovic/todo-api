import bcrypt from 'bcrypt';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

export const loginService = async (email: string, password: string) => {
	try {
		const account = await prisma.account.findUniqueOrThrow({
			where: {
				email,
			},
		});

		const match = await bcrypt.compare(password, account.password);
		
		const todoList = await prisma.todos.findFirst({
			where: {
				accountId: account.id
			}
		});

		if (match) {
			return {
				accountId: account.id,
				listId: todoList?.id
			};
		} else {
			throw new ApplicationError('Password or email is incorrect', 400);
		}
	} catch (error) {
		if (error instanceof ApplicationError) {
			throw new ApplicationError(error.message, error.status);
		} else {
			throw new ApplicationError('Password or email is incorrect', 404);
		}
	}
};
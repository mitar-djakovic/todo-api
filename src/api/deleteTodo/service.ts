import { Prisma } from '@prisma/client';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

export const deleteTodoService = async (listId: string, todoId: string) => {
	try {
		const todoList = await prisma.todos.findUniqueOrThrow({
			where: {
				id: listId
			}
		});

		if (todoList) {
			await prisma.todos.update({
				where: {
					id: listId
				},
				data: {
					todos: {
						set: todoList.todos.filter((todo ) => todo.todoId !== todoId)
					}
				}
			});
		}
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
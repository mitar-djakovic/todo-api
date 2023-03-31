import { Prisma } from '@prisma/client';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

export const getTodosService = async (listId: string, filter?: any) =>{
	try {
		const todoList = await prisma.todos.findUniqueOrThrow({
			where: {
				id: listId
			},
		});

		if (filter === 'null') {
			return todoList;
		} else {
			return {
				...todoList,
				todos: todoList.todos.filter((todo) => todo.completed === (filter === 'true'))
			};
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
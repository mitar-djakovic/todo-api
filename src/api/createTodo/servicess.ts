import { Prisma } from '@prisma/client';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

interface Todo {
	listId: string;
	todo: string;
}

export const createTodoService = async (values: Todo) => {
	try {
		console.log('---', values);
		const todoList = await prisma.todos.findUniqueOrThrow({
			where: {
				id: values.listId
			}
		});

		if (todoList) {
			await prisma.todos.update({
				where: {
					id: values.listId
				},
				data: {
					todos: [...todoList.todos, { todo: values.todo, completed: false }]
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
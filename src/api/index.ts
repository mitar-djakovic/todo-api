import { Router } from 'express';

import createTodo from './createTodo';
import deleteTodo from './deleteTodo';
import getTodos from './getTodos';
import logIn from './logIn';
import signUp from './signUp';
import updateTodo from './updateTodo';

const routes = Router()
	.use(signUp)
	.use(logIn)
	.use(createTodo)
	.use(getTodos)
	.use(createTodo)
	.use(updateTodo)
	.use(deleteTodo);

export default Router().use('/api', routes);
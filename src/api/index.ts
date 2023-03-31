import { Router } from 'express';

import createTodo from './createTodo';
import deleteTodo from './deleteTodo';
import getAccount from './getAccount';
import getTodos from './getTodos';
import logIn from './logIn';
import signUp from './signUp';
import updateTodo from './updateTodo';

const routes = Router()
	.use(createTodo)
	.use(deleteTodo)
	.use(getAccount)
	.use(getTodos)
	.use(logIn)
	.use(signUp)
	.use(updateTodo);

export default Router().use('/api', routes);
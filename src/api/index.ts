import { Router } from 'express';

import logIn from './logIn';
import signUp from './signUp';

const routes = Router()
	.use(signUp)
	.use(logIn);

export default Router().use('/api', routes);
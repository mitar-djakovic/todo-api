import { Router } from 'express';

import signUp from './signUp';

const routes = Router().use(signUp);

export default Router().use('/api', routes);
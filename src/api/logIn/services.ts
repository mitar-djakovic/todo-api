import bcrypt from 'bcrypt';

import { ApplicationError } from '../../middlewares/errors';
import prisma from '../../utils';

interface Credentials {
	email: string;
	password: string;
}

export const loginService = async (credentials: Credentials) => {
	try {
		console.log('values', credentials);
		const user = await prisma.account.findUniqueOrThrow({
			where: {
				email: credentials.email,
			},
		});

		const match = await bcrypt.compare(credentials.password, user.password);

		console.log('match', match);
		console.log('user', user);
		if (match) {
			return {
				email: user.email,
				fullName: user.fullName
			};
		} else {
			throw new ApplicationError('Password or email is incorrect', 400);
		}
	} catch (error) {
		console.log('err', error);
		if (error instanceof ApplicationError) {
			throw new ApplicationError(error.message, error.status);
		} else {
			throw new ApplicationError('Password or email is incorrect', 404);
		}
	}
};
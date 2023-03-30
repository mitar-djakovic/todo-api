import { Prisma } from '@prisma/client';

import {ApplicationError} from '../../middlewares/errors';
import prisma from '../../utils';

interface SignupValues {
	fullName: string;
	email: string;
	password: string;
}

export const signUpService = async (data: SignupValues) => {
	try {
		await prisma.account.create({ data });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new ApplicationError('Email already in use!', 404);
			}
		} else if (error instanceof ApplicationError) {
			throw new ApplicationError(error.message, 404);
		} else {
			throw new ApplicationError('Something went wrong!', 500);
		}
	}
};
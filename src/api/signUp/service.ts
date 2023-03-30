import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import {ApplicationError} from '../../middlewares/errors';
import prisma from '../../utils';

interface SignupValues {
	fullName: string;
	email: string;
	password: string;
}

export const signUpService = async (data: SignupValues) => {
	const password = await bcrypt.hash(data.password, 10);
	try {
		await prisma.account.create({
			data: {
				email: data.email,
				fullName: data.fullName,
				password
			}
		});
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
"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentStateTypes = {
	currentState: { success: boolean; error: boolean };
};

export const createSubject = async (
	currentState: CurrentStateTypes,
	data: SubjectSchema
) => {
	try {
		await prisma.subject.create({
			data: {
				name: data.name,
			},
		});

		// revalidatePath("list/subjects");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

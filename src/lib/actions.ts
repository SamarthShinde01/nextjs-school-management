"use server";

import { revalidatePath } from "next/cache";
import { ClassSchema, SubjectSchema } from "./formValidationSchemas";
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
				teachers: {
					connect: data.teachers.map((teacherId) => ({
						id: teacherId,
					})),
				},
			},
		});

		// revalidatePath("list/subjects");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

export const updateSubject = async (
	currentState: CurrentStateTypes,
	data: SubjectSchema
) => {
	try {
		await prisma.subject.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				teachers: {
					set: data.teachers.map((teacherId) => ({ id: teacherId })),
				},
			},
		});

		// revalidatePath("list/subjects");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

export const deleteSubject = async (
	currentState: CurrentStateTypes,
	data: FormData
) => {
	const id = data.get("id") as string;

	try {
		await prisma.subject.delete({
			where: {
				id: parseInt(id),
			},
		});

		// revalidatePath("list/subjects");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

export const createClass = async (
	currentState: CurrentStateTypes,
	data: ClassSchema
) => {
	try {
		await prisma.class.create({
			data,
		});

		// revalidatePath("list/class");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

export const updateClass = async (
	currentState: CurrentStateTypes,
	data: ClassSchema
) => {
	try {
		await prisma.class.update({
			where: {
				id: data.id,
			},
			data,
		});

		// revalidatePath("/list/class");
		return { success: true, error: false };
	} catch (err) {
		console.log(err);
		return { success: false, error: true };
	}
};

export const deleteClass = async (
	currentState: CurrentStateTypes,
	data: FormData
) => {
	const id = data.get("id") as any;
	try {
		await prisma.class.delete({
			where: {
				id: parseInt(id),
			},
		});

		// revalidatePath("/list/class");
		return { success: true, error: false };
	} catch (err) {
		console.error(err);
		return { success: false, error: true };
	}
};

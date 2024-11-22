import { User } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";

export const getMe = async () => {
	return (await axiosInstance.get<User>('/auth/me')).data;
};
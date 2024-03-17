import { create } from "zustand";
import http from "@/http/http";
import errorHandler from "@/utils/errorHandler";
interface IUser {
	_id: string;
	email: string;
	username: string;
}

export interface IUserStore {
	user: IUser | null;
	token: string | null;
	login: (params: ILoginParams) => Promise<void>;
	register: (params: IRegisterParams) => Promise<void>;
}
interface ILoginParams {
	email: string;
	password: string;
}
interface IRegisterParams {
	email: string;
	password: string;
	username: string;
	passwordConfirm: string;
}
interface IResponse<T> {
	data: { token: string; data: { user: T } };
}

export const useUserStore = create(
	(set): IUserStore => ({
		user: null,
		token: null,
		login: async (params: ILoginParams) => {
			await http
				.post("/auth/login", params)
				.then((res: IResponse<IUser>) => {
					console.log(res);
					set({
						token: res.data.token,
						user: res.data.data.user,
					});
				})
				.catch((error) => {
					console.log(error);
					set({
						token: null,
						user: null,
					});
					return errorHandler(error);
				});
		},
		register: async (params: IRegisterParams) => {
			await http
				.post("/auth/register", params)
				.then((res: IResponse<IUser>) => {
					console.log(res);
					set({
						token: res.data.token,
						user: res.data.data.user,
					});
				})
				.catch((error) => {
					console.log(error);
					set({
						token: null,
						user: null,
					});
					return errorHandler(error);
				});
		},
	})
);

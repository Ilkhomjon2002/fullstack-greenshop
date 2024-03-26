import { create } from "zustand";
import http from "@/http/http";
import errorHandler from "@/utils/errorHandler";
import { toast } from "@/components/shadcn/ui/use-toast";
import { AxiosResponse } from "axios";
interface IUser {
	_id: string;
	email: string;
	username: string;
}

export interface IUserStore {
	user: IUser | null;
	isLoggedIn: boolean;
	token: string | null;
	login: (params: ILoginParams) => Promise<void>;
	register: (params: IRegisterParams) => Promise<void>;
	logOut: () => Promise<void>;
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
	token: string;
	data: { user: T };
}

export const useUserStore = create(
	(set): IUserStore => ({
		user: JSON.parse(String(localStorage.getItem("user")))?.user || null,
		token: JSON.parse(String(localStorage.getItem("user")))?.token || null,
		isLoggedIn:
			JSON.parse(String(localStorage.getItem("user")))?.isLoggedIn || null,
		login: async (params: ILoginParams) => {
			await http
				.post("/auth/login", params)
				.then((res: AxiosResponse<IResponse<IUser>>) => {
					console.log(res);
					localStorage.setItem(
						"user",
						JSON.stringify({
							isLoggedIn: true,
							token: res.data.token,
							user: res.data.data.user,
						})
					);
					set({
						isLoggedIn: true,
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
					return errorHandler({ ...error, status: "401-1" });
				});
		},
		register: async (params: IRegisterParams) => {
			await http
				.post("/auth/register", params)
				.then((res: AxiosResponse<IResponse<IUser>>) => {
					console.log(res);
					localStorage.setItem(
						"user",
						JSON.stringify({
							isLoggedIn: true,
							token: res.data.token,
							user: res.data.data.user,
						})
					);
					set({
						isLoggedIn: true,
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
		logOut: async () => {
			localStorage.clear();
			window.location.reload();
		},
	})
);

import { create } from "zustand";
import http from "@/http/http";
import errorHandler from "@/utils/errorHandler";
import { toast } from "@/components/shadcn/ui/use-toast";
import { AxiosResponse } from "axios";
interface IUserUpdateParams {
	_id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	password?: {
		currentPassword?: string;
		newPassword?: string;
		confirmPassword?: string;
	};
}
export interface IUser {
	_id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	avatarUrl: string;
	userBillingAddress: IUserAddress[];
}
export interface IUserAddress {
	_id: string;
	firstName: string;
	lastName: string;
	country: string;
	streetAddress: string;
	state: string;
	emailAddress: string;
	city: string;
	extraAddress: string;
	phoneNumber: string;
	zip: string;
}
export interface IUserStore {
	user: IUser | null;
	billingAddress: IUserAddress | null;
	isLoading: boolean;
	updateUser: (data: IUserUpdateParams) => Promise<any>;
	updateAddress: (data: any, userId: any) => Promise<any>;
	getUser: (_id: string) => Promise<IUser | unknown>;
	deleteUser: (_id: string) => Promise<void>;
	getBillingAddress: (_id: string, userId: string) => Promise<any>;
}

interface IResponse<T> {
	data: T;
}

export const useUserStore = create(
	(set): IUserStore => ({
		user: null,
		billingAddress: null,
		isLoading: false,
		updateUser: async (data: IUserUpdateParams) => {
			const { _id, ...rest } = data;
			return await http.put(`/user/${_id}`, rest).then(
				(res: AxiosResponse<{ message: string; status: string }>) => {
					return res.data.message;
				},
				(err: any) => {
					return errorHandler({ ...err });
				}
			);
		},
		getUser: async (_id: string) => {
			return await http.get(`/user/${_id}`).then(
				(res: AxiosResponse<IResponse<IUser>>) => {
					set({
						isLoading: false,
						user: res.data.data,
					});
					return res.data.data;
				},
				(err: any) => {
					set({
						isLoading: false,
						user: null,
					});
					console.log(err);
					return errorHandler({ ...err });
				}
			);
		},
		deleteUser: async (_id: string) => {
			await http.delete(`/user/${_id}`).then(
				(res: any) => {
					console.log(res);
				},
				(err: any) => {
					console.log(err);
				}
			);
		},
		updateAddress: async (data: IUserAddress, userId: string) => {
			const { _id, ...rest } = data;
			return await http.put(`/user/${userId}/address/${_id}`, rest).then(
				(res: AxiosResponse<{ message: string; status: string }>) => {
					return res.data.message;
				},
				(err: any) => {
					return errorHandler({ ...err });
				}
			);
		},
		getBillingAddress: async (_id: string, userId: string) => {
			return await http.get(`/user/${userId}/address/${_id}`).then(
				(res: AxiosResponse<IResponse<IUserAddress>>) => {
					set({
						isLoading: false,
						billingAddress: res.data.data,
					});
					return res.data.data;
				},
				(err: any) => {
					set({
						isLoading: false,
						billingAddress: null,
					});
					console.log(err);
					return errorHandler({ ...err });
				}
			);
		},
	})
);

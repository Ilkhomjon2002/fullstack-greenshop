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
	billingAddresses: IUserAddress[];
	isLoading: boolean;
	updateUser: (data: IUserUpdateParams) => Promise<any>;
	putBillingAddress: (data: any, userId: any) => Promise<any>;
	getUser: (_id: string) => Promise<IUser | unknown>;
	deleteUser: (_id: string) => Promise<void>;
	getBillingAddress: (_id: string, userId: string) => Promise<any>;
	postBillingAddress: (data: any, userId: string) => Promise<any>;
	deleteBillingAddress: (data: any, userId: string) => Promise<any>;
	getBillingAddresses: (userId: string, signal?: any) => Promise<any>;
	updateBillingAddressSync: (billingAddresses: IUserAddress[]) => void;
}

interface IResponse<T> {
	data: T;
}

export const useUserStore = create(
	(set): IUserStore => ({
		user: JSON.parse(String(localStorage.getItem("user"))) || null,
		billingAddress: null,
		billingAddresses: [],
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
		putBillingAddress: async (data: IUserAddress, userId: string) => {
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
		postBillingAddress: async (data: IUserAddress, userId: string) => {
			const { _id, ...rest } = data;
			return await http.post(`/user/${userId}/address`, rest).then(
				(res: AxiosResponse<{ message: string; status: string }>) => {
					return res.data;
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
		deleteBillingAddress: async (_id: string, userId: string) => {
			return await http.delete(`/user/${userId}/address/${_id}`).then(
				(res: AxiosResponse<{ message: string; status: string }>) => {
					return res.data.message;
				},
				(err: any) => {
					return errorHandler({ ...err });
				}
			);
		},
		getBillingAddresses: async (userId: string, signal?: AbortSignal) => {
			return await http
				.get(`/user/${userId}/address`, { signal: signal ? signal : undefined })
				.then(
					(res: AxiosResponse<IResponse<IUserAddress>>) => {
						set({
							isLoading: false,
							billingAddresses: res.data.data,
						});
						return res.data.data;
					},
					(err: any) => {
						set({
							isLoading: false,
							billingAddresses: [],
						});
						console.log(err);
						return errorHandler({ ...err });
					}
				);
		},
		updateBillingAddressSync: (billingAddresses: IUserAddress[]) => {
			console.log(billingAddresses);
			set({ billingAddresses });
		},
	})
);

import { Button } from "../shadcn/ui/button";

import { useState } from "react";
import { IUserStore, useUserStore } from "@/store/user";
import { toast } from "@/components/shadcn/ui/use-toast";
import { AddressForm as AddAddressForm } from "../organisms/addressForm";
import { AddressesList } from "../organisms/addressesList";

const AccountDetails = () => {
	const userStore = useUserStore((state) => state as IUserStore);
	const [formShown, setFormShown] = useState(false);
	const [updateFormShown, setUpdateFormsShown] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);

	async function onSubmitAdd(values: any) {
		const userId = JSON.parse(String(localStorage.getItem("user")))._id;

		return await userStore
			.postBillingAddress(values, userId)
			.then((data: any) => {
				userStore.getUser(userId).then((res: any) => {
					localStorage.setItem("user", JSON.stringify(res));
				});
				toast({
					variant: "default",
					title: "",
					description: data.message,
				});
			});
	}
	async function onSubmitUpdate(values: any) {
		const userId = JSON.parse(String(localStorage.getItem("user")))._id;

		return await userStore
			.putBillingAddress(values, userId)
			.then((data: any) => {
				userStore.getUser(userId).then((res: any) => {
					localStorage.setItem("user", JSON.stringify(res));
				});
				toast({
					variant: "default",
					title: "",
					description: data.message,
				});
				setSelectedRow(null);
			});
	}
	const showUpdateForm = (row: any) => {
		setSelectedRow(row);
		setUpdateFormsShown(true);
	};
	const closeForms = () => {
		setFormShown(false);
		setUpdateFormsShown(false);
		setSelectedRow(null);
	};

	return (
		<div>
			<div className="flex justify-between align-top">
				{" "}
				<div>
					<div className="font-medium">Billing Address</div>
					<div className="text-textGrey text-[15px] text-gray-500 pt-2">
						The following addresses will be used on the checkout page by
						default.
					</div>
				</div>
				<div>
					<Button
						variant={"ghost"}
						onClick={() => {
							setSelectedRow(null);
							setUpdateFormsShown(false);
							setFormShown(true);
						}}
						className="text-primary"
					>
						Add
					</Button>
				</div>
			</div>
			{!formShown && !updateFormShown && (
				<AddressesList showForm={showUpdateForm}></AddressesList>
			)}
			{formShown && (
				<AddAddressForm
					goBack={closeForms}
					data={selectedRow}
					onSubmit={onSubmitAdd}
					onMount={() => {}}
				></AddAddressForm>
			)}
			{updateFormShown && (
				<AddAddressForm
					goBack={closeForms}
					data={selectedRow}
					onSubmit={onSubmitUpdate}
					onMount={() => {}}
				></AddAddressForm>
			)}

			{/* <Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="pt-16">
					<div className="flex justify-between align-top">
						{" "}
						<div>
							<div className="font-medium">Shipping Address</div>
							<div className="text-textGrey text-[15px] text-gray-500 pt-2">
								You have not set up this type of address yet.
							</div>
						</div>
						<div className="flex gap-3 items-center">
							<RadioGroupComp
								items={[
									{
										title: "Same as billing address",
										value: "same",
										className: "font-normal",
									},
								]}
							></RadioGroupComp>
							<Button variant={"ghost"} className="text-primary">
								Add
							</Button>
						</div>
					</div>
				</form>
			</Form> */}
		</div>
	);
};

export default AccountDetails;

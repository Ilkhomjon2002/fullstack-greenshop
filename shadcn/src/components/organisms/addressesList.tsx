import { IUserStore, useUserStore } from "@/store/user";
import { useEffect } from "react";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { TrashIcon } from "lucide-react";
import { DataTable } from "../atoms/table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../shadcn/ui/checkbox";
import { toast } from "../shadcn/ui/use-toast";
import { BillingAddressTable } from "./types";

export const columns: ColumnDef<BillingAddressTable>[] = [
	{
		id: "select",
		header: "Select",
		cell: (table) => (
			<>
				<Checkbox
					onClick={(e) => {
						console.log("clicked");
						e.stopPropagation();
					}}
					checked={table.row.getIsSelected()}
					onCheckedChange={(value) => table.row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</>
		),
	},
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},
	{
		id: "delete",
		header: "Delete",
		cell: ({ row }) => {
			const userStore = useUserStore((state) => state as IUserStore);
			return (
				<>
					<ButtonIcon
						onClick={(e) => {
							e.stopPropagation();

							if (confirm("Are you going to delete this billing address?")) {
								console.log(row.original);
								userStore
									.deleteBillingAddress(
										String(row?.original?._id),
										String(userStore.user?._id)
									)
									.then((res) => {
										userStore.updateBillingAddressSync(
											userStore.billingAddresses.filter(
												(val) => val._id != row.original._id
											)
										);

										toast({
											variant: "default",
											title: "",
											description: res,
										});
									});
							}
						}}
					>
						<TrashIcon size={"18px"} color="red"></TrashIcon>
					</ButtonIcon>
				</>
			);
		},
	},
];

export const AddressesList = ({
	showForm,
}: {
	showForm: (row: any) => void;
}) => {
	const userStore = useUserStore((state) => state as IUserStore);
	const getAddresses = async (signal: AbortSignal) => {
		const userId = userStore.user?._id;
		return await userStore.getBillingAddresses(String(userId), signal);
	};
	useEffect(() => {
		const abortController = new AbortController();
		getAddresses(abortController.signal);
		return () => {
			abortController.abort();
		};
	}, []);

	const onRowClick = (data: any) => {
		showForm(data);
	};
	return (
		<div>
			<div className="container mx-auto py-10">
				<DataTable
					rowClick={onRowClick}
					columns={columns}
					data={userStore.billingAddresses}
				/>
			</div>
		</div>
	);
};

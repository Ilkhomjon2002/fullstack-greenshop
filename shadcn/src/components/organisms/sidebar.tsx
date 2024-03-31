import {
	DownloadIcon,
	HeartIcon,
	LocateIcon,
	LogOutIcon,
	LucideGitGraph,
	MessageCircleWarning,
	ShoppingCartIcon,
	User,
} from "lucide-react";
import { CustomDropDown } from "../atoms/customDropdown";
import { IAuthStore, useAuthStore } from "@/store/auth";

export const Sidebar = () => {
	const userStore = useAuthStore((state) => state as IAuthStore);
	const sidebarItems = [
		{ to: "detail", title: "Account Details", icon: <User width={"18px"} /> },
		{ to: "address", title: "Address", icon: <User width={"18px"} /> },
		{
			to: "orders",
			title: "Orders",
			icon: <ShoppingCartIcon width={"18px"} />,
		},
		{ to: "wishlist", title: "Wishlist", icon: <HeartIcon width={"18px"} /> },
		{
			to: "reports",
			title: "Reports",
			icon: <ShoppingCartIcon width={"18px"} />,
		},
		{
			to: "downloads",
			title: "Downloads",
			icon: <DownloadIcon width={"18px"} />,
		},
		{
			to: "support",
			title: "Support",
			icon: <MessageCircleWarning width={"18px"} />,
		},
		{ title: "seperator" },
		{
			action: userStore.logOut,
			title: "Logout",
			icon: <LogOutIcon width={"18px"} />,
			className: "text-primary",
			to: null,
		},
	];
	return (
		<>
			<CustomDropDown
				title={"My Account"}
				items={sidebarItems}
			></CustomDropDown>
		</>
	);
};

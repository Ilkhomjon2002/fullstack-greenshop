import ProfilePage from "@/components/pages/profile";
import { ReactNode } from "react";

export interface IRoute {
	id: number | string;
	path: string;
	component: ReactNode;
	title: string;
	navLink: boolean;
	children?: IRoute[];
}

export const routes: IRoute[] = [
	{
		id: 0,
		path: "",
		component: <></>,
		title: "",
		navLink: true,
	},
	{
		id: 1,
		path: "/home",
		component: <></>,
		title: "Home",
		navLink: true,
	},
	{
		id: 2,
		path: "/shop",
		component: <></>,
		title: "Shop",
		navLink: true,
	},
	{
		id: 3,
		path: "/plantCare",
		component: <></>,
		title: "Plant Care",
		navLink: true,
	},
	{
		id: 4,
		path: "/blogs",
		component: <></>,
		title: "Blogs",
		navLink: true,
	},
	{
		id: 4,
		path: "/profile",
		component: <ProfilePage />,
		title: "Blogs",
		navLink: false,
		children: [
			{
				id: "4-1",
				path: "/detail",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-2",
				path: "/address",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-3",
				path: "/orders",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-4",
				path: "/wishlist",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-5",
				path: "/reports",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-6",
				path: "/downloads",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
			{
				id: "4-7",
				path: "/support",
				component: <></>,
				title: "Account Detail",
				navLink: false,
			},
		],
	},
];

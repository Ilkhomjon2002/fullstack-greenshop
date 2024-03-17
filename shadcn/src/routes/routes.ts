export interface IRoute {
	id: number;
	path: string;
	component: React.FC | null;
	title: string;
	navLink: boolean;
}

const routes: IRoute[] = [
	{
		id: 0,
		path: "",
		component: null,
		title: "",
		navLink: true,
	},
	{
		id: 1,
		path: "/home",
		component: null,
		title: "Home",
		navLink: true,
	},
	{
		id: 2,
		path: "/shop",
		component: null,
		title: "Shop",
		navLink: true,
	},
	{
		id: 3,
		path: "/plantCare",
		component: null,
		title: "Plant Care",
		navLink: true,
	},
	{
		id: 4,
		path: "/blogs",
		component: null,
		title: "Blogs",
		navLink: true,
	},
];

export default routes;

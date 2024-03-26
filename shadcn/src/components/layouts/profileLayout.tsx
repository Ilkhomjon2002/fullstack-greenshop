import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
const ProfileLayout: React.FC = () => {
	return (
		<>
			<div className="w-full pt-16">
				<div className="w-[300px]">
					<Sidebar></Sidebar>
				</div>
				<Outlet></Outlet>
			</div>
		</>
	);
};

export default ProfileLayout;

import { Outlet } from "react-router-dom";
import { Sidebar } from "../organisms/sidebar";
const ProfileLayout: React.FC = () => {
	return (
		<>
			<div className="w-full pt-16 flex gap-7">
				<div className="w-[25%]">
					<Sidebar></Sidebar>
				</div>
				<div className="w-[75%]">
					<Outlet></Outlet>
				</div>
			</div>
		</>
	);
};

export default ProfileLayout;

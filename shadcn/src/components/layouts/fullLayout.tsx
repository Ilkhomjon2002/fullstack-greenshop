import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layouts/navbar";
import { Toaster } from "@/components/shadcn/ui/toaster";
const FullLayout: React.FC = () => {
	return (
		<>
			<Toaster></Toaster>
			<div className="px-[120px] pt-3">
				<Navbar></Navbar>
				<Outlet></Outlet>
			</div>
		</>
	);
};

export default FullLayout;

import { Outlet } from "react-router-dom";
import { PrimaryButton } from "../atoms/buttons";
import { Navbar } from "../organisms/navbar/navbar";
import { Box } from "@chakra-ui/react";
const FullLayout: React.FC = () => {
	return (
		<>
			<Box px={"120px"} pt={"25px"}>
				<Navbar></Navbar>
				<Outlet></Outlet>
			</Box>
		</>
	);
};

export default FullLayout;

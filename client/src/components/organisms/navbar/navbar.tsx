import { ReactComponent as LoginIcon } from "../../../public/icons/loginIcon.svg";
import { ReactComponent as CartIcon } from "../../../public/icons/cartIcon.svg";
import { ReactComponent as SearchIcon } from "../../../public/icons/searchIcon.svg";
import { ReactComponent as FullIcon } from "../../../public/icons/fullLogoIcon.svg";
import { Box, Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { LinkButton, PrimaryButton } from "../../atoms/buttons";
import { NavLink } from "react-router-dom";
import routes, { IRoute } from "../../../routes/routes";
import LogRegModal from "../../moleculas/loginModal/loginModal";
export const Navbar: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<LogRegModal isOpen={isOpen} onClose={onClose}></LogRegModal>
			<Flex
				alignItems={"center"}
				justifyContent={"space-between"}
				borderBottom="1px"
				borderColor="brand.20"
			>
				<Flex>
					<FullIcon></FullIcon>
				</Flex>
				<Flex alignItems={"center"} gap={"50px"} className="navbar__routes">
					{routes.map((route: IRoute) => {
						return (
							<LinkButton
								key={route.id}
								to={route.path}
								title={route.title}
							></LinkButton>
						);
					})}
				</Flex>
				<Flex alignItems={"center"} gap={"30px"}>
					<IconButton
						variant={"solid"}
						isRound={true}
						bg={"transparent"}
						icon={<SearchIcon />}
						aria-label="Search"
					></IconButton>
					<IconButton
						variant={"solid"}
						isRound={true}
						bg={"transparent"}
						icon={<CartIcon />}
						aria-label="Cart"
					></IconButton>

					<PrimaryButton onClick={onOpen} leftIcon={<LoginIcon />}>
						Login
					</PrimaryButton>
				</Flex>
			</Flex>
		</>
	);
};

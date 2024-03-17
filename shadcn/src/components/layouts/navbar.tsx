import LoginIcon from "@/public/icons/loginIcon.svg";
import CartIcon from "@/public/icons/cartIcon.svg";
import SearchIcon from "@/public/icons/searchIcon.svg";
import FullIcon from "@/public/icons/fullLogoIcon.svg";
// import { LinkButton, PrimaryButton } from "../../atoms/buttons";
import NavLink from "@/components/atoms/NavLink";
import routes, { IRoute } from "@/routes/routes";
import { Button } from "../shadcn/ui/button";
import { ButtonWithIcon } from "../atoms/ButtonWithIcon";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { CustomDialog } from "../organisms/dialog";
import { LoginForm } from "../organisms/loginForm";
import { useState } from "react";
import { RegisterForm } from "../organisms/registerForm";
// import LogRegModal from "../../moleculas/loginModal/loginModal";
export const Navbar: React.FC = () => {
	const [formType, setFormType] = useState("login");
	const changeForm = (type: "login" | "register") => {
		console.log(type);
		setFormType(type);
	};
	return (
		<div className="flex items-center justify-between border-b-2  border-primary/10">
			<div className="navbar__logo">
				<img src={FullIcon} alt="" />
			</div>
			<div className="flex item-center gap-x-12 relative">
				{routes.map((route: IRoute) => {
					return route.navLink ? (
						<NavLink key={route.id} to={route.path}>
							{route.title}
						</NavLink>
					) : (
						<></>
					);
				})}
			</div>
			<div className="flex item-center gap-x-7">
				<ButtonIcon iconSrc={SearchIcon}></ButtonIcon>
				<ButtonIcon iconSrc={CartIcon}></ButtonIcon>
				<CustomDialog
					trigger={
						<ButtonWithIcon iconSrc={LoginIcon} title="Login"></ButtonWithIcon>
					}
				>
					{formType == "login" ? (
						<LoginForm setFormType={changeForm}></LoginForm>
					) : (
						<RegisterForm setFormType={changeForm}></RegisterForm>
					)}
				</CustomDialog>
			</div>
		</div>
	);
};

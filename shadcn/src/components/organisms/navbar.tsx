import LoginIcon from "@/public/icons/loginIcon.svg";
import CartIcon from "@/public/icons/cartIcon.svg";
import SearchIcon from "@/public/icons/searchIcon.svg";
import FullIcon from "@/public/icons/fullLogoIcon.svg";
import NavLink from "@/components/atoms/NavLink";
import { IRoute, routes } from "@/routes/routes";
import { Button } from "../shadcn/ui/button";
import { ButtonWithIcon } from "../atoms/ButtonWithIcon";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { CustomDialog } from "./dialog";
import { LoginForm } from "./loginForm";
import { useState } from "react";
import { RegisterForm } from "./registerForm";
import { IAuthStore, useAuthStore } from "@/store/auth";
import { AvatarComp } from "../atoms/avatar";
import { DropdownMenuComp } from "../atoms/dropDownMenu";
export const Navbar: React.FC = () => {
	const [formType, setFormType] = useState("login");
	const [openLogin, setOpenLogin] = useState(false);
	const userStore = useAuthStore((state) => state as IAuthStore);
	const changeForm = (type: "login" | "register") => {
		console.log(type);
		setFormType(type);
	};
	const closeForm = () => {
		setOpenLogin(false);
	};
	return (
		<div className="flex items-center justify-between border-b-2  border-primary/10">
			<div className="navbar__logo">
				<img src={FullIcon} alt="" />
			</div>
			<div className="flex item-center gap-x-12 relative">
				{routes.map((route: IRoute) => {
					return (
						route.navLink && (
							<NavLink key={route.id} to={route.path}>
								{route.title}
							</NavLink>
						)
					);
				})}
			</div>
			<div className="flex item-center gap-x-7">
				<ButtonIcon iconSrc={SearchIcon}></ButtonIcon>
				<ButtonIcon iconSrc={CartIcon}></ButtonIcon>
				{userStore.isLoggedIn ? (
					<DropdownMenuComp
						title={"My account"}
						groups={[
							{
								title: "user",
								groupItems: [
									{ title: "Profile", shortcut: null, path: "/profile" },
									{
										title: "Logout",
										shortcut: null,
										action: userStore.logOut,
									},
								],
							},
						]}
					>
						<AvatarComp
							avatarUrl=""
							fallback={String(
								userStore.user?.username.slice(0, 1).toUpperCase()
							)}
						></AvatarComp>
					</DropdownMenuComp>
				) : (
					<CustomDialog
						onOpenChange={setOpenLogin}
						open={openLogin}
						trigger={
							<ButtonWithIcon
								iconSrc={LoginIcon}
								title="Login"
							></ButtonWithIcon>
						}
					>
						{formType == "login" ? (
							<LoginForm
								setFormType={changeForm}
								closeForm={closeForm}
							></LoginForm>
						) : (
							<RegisterForm
								closeForm={closeForm}
								setFormType={changeForm}
							></RegisterForm>
						)}
					</CustomDialog>
				)}
			</div>
		</div>
	);
};

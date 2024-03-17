import { NavLink, NavLinkProps } from "react-router-dom";
import "./css/navlink.css";

const NavlinkComponent = (props: NavLinkProps) => {
	return (
		<NavLink
			className={({ isActive }) => {
				return isActive
					? "nav__link__active py-6 font-semi-bold"
					: "nav__link__btn py-6 font-semi-bold";
			}}
			{...props}
		></NavLink>
	);
};

export default NavlinkComponent;

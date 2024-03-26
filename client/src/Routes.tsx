import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import FullLayout from "./components/layouts/fullLayout";
import routes, { IRoute } from "./routes/routes";
export default () => {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			<Route element={<FullLayout></FullLayout>}>
				{routes.map((route: IRoute) => {
					return (
						<Route path={route.path} key={route.id} element={<></>}></Route>
					);
				})}
			</Route>
		</Routes>
	);
};

import axios from "axios";
const baseURL = "http://localhost:8080" + "/v1";

const instance = axios.create({
	baseURL,
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		if (error.code == "ERR_NETWORK") {
			return Promise.reject({
				error: "Network Failed. Please check your connection!",
				status: "CONERROR",
			});
		} else if (error.code == "ECONNABORTED") {
			return Promise.reject({
				error: "Connection Time out. Please check your connection!",
				status: "CONERROR",
			});
		} else {
			const {
				config,
				response: { status },
			} = error;
			const originalRequest = config;

			let resData: { code: any; error: any; data: any; status: any } = {
				code: null,
				error: null,
				data: null,
				status: null,
			};

			resData.code = error.response.data.code;
			resData.error = error.response.data.message;
			resData.status = status;
			return Promise.reject(resData);
		}
	}
);

export default instance;

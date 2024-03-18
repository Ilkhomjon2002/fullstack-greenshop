import queryStringify from "../utils/queryStringify";
import { Response } from "express";
import axios from "axios";
import { IGoogleUser } from "../types/userTypes";
const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
export default {
	googleInit: (res: Response) => {
		const options = {
			redirect_uri: process.env.GOOGLE_REDIRECT_URL,
			client_id: process.env.GOOGLE_CLIENT_ID,
			access_type: "offline",
			response_type: "code",
			prompt: "consent",
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			].join(" "),
		};
		return res.redirect(`${rootUrl}?${queryStringify(options)}`);
	},
	googleGetToken: async (code: string) => {
		const url = "https://oauth2.googleapis.com/token";
		const values: any = {
			code,
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			redirect_uri: process.env.GOOGLE_REDIRECT_URL,
			grant_type: "authorization_code",
		};
		return await axios.post(url, queryStringify(values), {
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
		});
	},
	googleGetUser: async ({
		access_token,
		id_token,
		res,
	}: {
		access_token: string;
		id_token: string;
		res: Response;
	}) => {
		console.log("accesstoken", access_token);
		console.log("idtoken", id_token);
		const response = await axios
			.get<IGoogleUser>(
				`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
				{
					headers: {
						Authorization: `Bearer ${id_token}`,
					},
				}
			)
			.catch((error: any) => {
				console.error("GOOGLE AUTH ERROR", error);
				return res.redirect(`http://localhost:5173?error=${error.message}`);
			});
		return response?.data;
	},
	facebookInit: (res: Response) => {
		const options = {
			client_id: process.env.FACEBOOK_APP_ID,
			redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
			scope: "email",
		};
		const url = `https://www.facebook.com/v13.0/dialog/oauth?${queryStringify(
			options
		)}`;
		return res.redirect(url);
	},
	facebookGetToken: async (code: string) => {
		console.log("code:", code);
		const values = {
			code,
			client_id: process.env.FACEBOOK_APP_ID,
			client_secret: process.env.FACEBOOK_APP_SECRET,
			redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
		};

		return await axios.get(
			`https://graph.facebook.com/v13.0/oauth/access_token?${queryStringify(
				values
			)}`,
			{
				headers: {
					"content-type": "application/x-www-form-urlencoded",
				},
			}
		);
	},
	facebookGetUser: async (access_token: string, res: Response) => {
		const response = await axios
			.get(
				`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`
			)
			.then((res) => res.data)
			.catch((err: any) => {
				console.log(err);
				return res.redirect(`http://localhost:5173?error=${err.message}`);
			});
		return response;
	},
};

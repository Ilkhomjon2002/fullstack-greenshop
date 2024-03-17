import { useToastStore } from "@/store/alert";

export default (err: any) => {
	const alertStore = useToastStore();
	return new Promise((_, reject) => {
		switch (err.status) {
			case 400:
				alertStore.addToast("ERROR", "Something went wrong", err.message);
				break;
			case 401:
				alertStore.addToast("ERROR", "Unauthorized request", err.message);
				break;
			case 404:
				alertStore.addToast("ERROR", "Not found", err.message);
				break;
		}
		if (err.status >= 500) {
			alertStore.addToast("ERROR", "Server error", err.message);
		}
		if (err.status == "CONERROR") {
			alertStore.addToast("ERROR", "Connection error", err.message);
		}
		reject(err);
	});
};

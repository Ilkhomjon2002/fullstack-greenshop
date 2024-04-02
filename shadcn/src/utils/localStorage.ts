interface ILocalStorageItem {
	key: string;
	value: any;
}
export default {
	setItems: (items: ILocalStorageItem[]) => {
		items.forEach((item: ILocalStorageItem) => {
			localStorage.setItem(item.key, JSON.stringify(item.value));
		});
	},
};

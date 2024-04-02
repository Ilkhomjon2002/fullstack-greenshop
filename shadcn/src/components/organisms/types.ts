export interface IAddressForm {
	data: any;
	onSubmit: (data: any) => void;
	onMount: () => void;
	goBack: () => void;
}
export interface AddressFormSchemaType {
	firstName: string;
	lastName: string;
	country: string;
	city: string;
	streetAddress: string;
	extraAddress: string;
	state: string;
	zip: string;
	emailAddress: string;
	phoneNumber: string;
}
export type BillingAddressTable = {
	_id: string;
	firstName: string;
	city: string;
	phoneNumber: string;
};

export interface FormSchemaType {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	username: string;
	password?: {
		currentPassword?: string;
		newPassword?: string;
		confirmPassword?: string;
	};
}

export interface IUserDetailsProps {
	onSubmit: (values: FormSchemaType) => void;
}

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcn/ui/avatar";

interface IUserAvatarProps {
	avatarUrl: string;
	fallback: string;
}
export function AvatarComp(props: IUserAvatarProps) {
	return (
		<Avatar>
			<AvatarImage src={props.avatarUrl} alt="@shadcn" />
			<AvatarFallback>{props.fallback}</AvatarFallback>
		</Avatar>
	);
}

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { cn } from "@/lib/utils";

interface IUserAvatarProps {
	avatarUrl?: string;
	fallback?: string;
	fallbackImg?: string;
}
export function AvatarComp(props: IUserAvatarProps) {
	return (
		<Avatar>
			{props.fallbackImg ? (
				<AvatarImage
					className={cn(!props.avatarUrl)}
					src={props?.avatarUrl ? props.avatarUrl : props?.fallbackImg}
				></AvatarImage>
			) : (
				<>
					<AvatarImage src={props.avatarUrl} alt="@shadcn" />
					<AvatarFallback>{props.fallback}</AvatarFallback>
				</>
			)}
		</Avatar>
	);
}

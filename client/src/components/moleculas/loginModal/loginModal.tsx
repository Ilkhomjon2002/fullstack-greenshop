import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { PrimaryButton } from "../../atoms/buttons";

function LogRegModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const [input, setInput] = useState("");

	const handleInputChange = (e: any) => setInput(e.target.value);
	const isError = input === "";
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent borderRadius={"0px"} minW={"500px"}>
					<ModalCloseButton />
					<ModalBody>
						<Box></Box>
						<Box as="span">Enter your email and password to register.</Box>
						<FormControl
							margin={"0 auto"}
							maxWidth={"300px"}
							isInvalid={isError}
						>
							<FormLabel>Email</FormLabel>
							<Input
								borderRadius={"5px"}
								w={"100%"}
								type="email"
								value={input}
								onChange={handleInputChange}
							/>
							{!isError ? (
								<FormHelperText>
									Enter the email you'd like to receive the newsletter on.
								</FormHelperText>
							) : (
								<FormErrorMessage>Email is required.</FormErrorMessage>
							)}
							<PrimaryButton onClick={() => {}}>Register</PrimaryButton>
						</FormControl>
					</ModalBody>

					<ModalFooter></ModalFooter>
					<Box w={"100%"} h={"10px"} background={"brand.100"}></Box>
				</ModalContent>
			</Modal>
		</>
	);
}
export default LogRegModal;

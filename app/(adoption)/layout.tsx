import Image from "next/image";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center items-center flex-col">
			<Image src="/small.jpeg" alt="logo" width={300} height={100} />

			{children}
		</div>
	);
}

export default layout;

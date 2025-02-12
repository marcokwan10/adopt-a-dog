import Image from "next/image";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center items-center flex-col">
			<Image className="mt-4" src="/paw.svg" alt="logo" width={200} height={100} />

			{children}
		</div>
	);
}

export default layout;

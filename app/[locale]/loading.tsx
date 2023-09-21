import Image from "next/image";

const Loading = () => {
    return (
        <div
            className={
                "flex flex-col items-center justify-center w-screen text-9xl text-gray-800"
            }
        >
            <Image
                src={`/images/spinner.svg`}
                alt={"spinner"}
                width={"240"}
                height={"240"}
            />
        </div>
    );
};
export default Loading;

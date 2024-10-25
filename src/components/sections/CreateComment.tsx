import Button from "@components/buttos/Button";
import type { User } from "@types"
interface Props {
    user: User
}

export default function CreateComment(props: Props) {
    const { username, image } = props.user;

    return (
        <div class={"grid grid-cols-2 gap-y-4 max-w-sm w-full p-4 md:flex items-start md:gap-x-4 md:max-w-[732px] border border-moderateBlue justify-between"}>
            <div class={"w-12 col-span-1 md:w-12"}>
                <img
                    src={`/${image.webp}`}
                    alt={username}
                    width={1000}
                    height={1000}
                    class={"w-10 h-10 col-span-1"}
                />
            </div>
            <textarea
                id="comment"
                class={"col-span-2 w-full resize-none h-24 rounded-lg px-6 py-3 text-grayishBlue border border-lightGrayishBlue bg-lightGray outline-none focus:border-moderateBlue md:w-[506px] flex-shrink"}
                placeholder={"Add a comment.."}
            />
            <div class={"w-full flex items-center justify-end"}>
                <Button typeButton="default"
                    hasABackground
                    className="col-span-1 !w-[104px] !h-12">
                    send
                </Button>
            </div>
        </div>
    )
}
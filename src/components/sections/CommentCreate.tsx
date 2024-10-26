import { h } from 'preact';
import { useState } from 'preact/hooks';
import Profile from "@components/ui/Profile";
import type { User } from "@types";
import Button from '@components/ui/Button';
import clsx from 'clsx';

interface Props {
    user: User;
    onSend: (text: string) => void;
    isReply?: boolean;
}

export default function CreateComment({ user, onSend, isReply }: Props) {
    const [comment, setComment] = useState<string>("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (comment.trim()) {
            onSend(comment);
            setComment(""); // Limpiar el textarea después de enviar
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            class={clsx("grid grid-rows-1 gap-y-4 max-w-md w-full p-4 h-fit md:p-6 md:flex md:items-start md:gap-x-4 md:max-w-lg lg:max-w-[732px] md:justify-between bg-white rounded-md"
                , isReply ? "relative" : "fixed bottom-0 left-1/2 right-1/2 -translate-x-1/2"
            )}
        >
            <div class="w-fit [grid-row:2] h-fit">
                <Profile user={user} onlyPhoto={true} />
            </div>
            <textarea
                name={"comment"}
                id="comment"
                value={comment}
                onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
                class={clsx("col-span-2 [grid-row:1] w-full resize-none max-h-60 h-full  rounded-lg px-6 py-3 text-grayishBlue border border-lightGray outline-none focus:border-moderateBlue md:max-w-[506px] flex-shrink [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-lightGrayishBlue [&::-webkit-scrollbar-thumb]:rounded-lg",
                    isReply && "min-h-40",
                    !isReply && "min-h-24"
                )
                }
                placeholder="Add a comment.."
            />
            <div class="w-full h-fit flex items-center justify-end md:w-auto">
                <Button
                    typeButton="default"
                    hasABackground
                    className="!w-[104px] !h-12"
                >
                    {isReply ? "reply" : "send"}
                </Button>
            </div>
        </form>
    );
}

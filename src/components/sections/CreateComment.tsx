import { h } from 'preact';
import { useState } from 'preact/hooks';
import Profile from "@components/ui/Profile";
import type { User } from "@types";
import Button from '@components/ui/Button';

interface Props {
    user: User;
    onSend: (text: string) => void;
}

export default function CreateComment({ user, onSend }: Props) {
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
            class="fixed bottom-0 left-1/2 right-1/2 -translate-x-1/2 grid grid-rows-1 gap-y-4 max-w-md w-full p-4 h-fit md:p-6 md:flex md:items-start md:gap-x-4 md:max-w-lg lg:max-w-[732px] md:justify-between bg-white rounded-md"
        >
            <div class="w-fit [grid-row:2] h-fit">
                <Profile user={user} onlyPhoto={true} />
            </div>
            <textarea
                name={"comment"}
                id="comment"
                value={comment}
                onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
                class="col-span-2 [grid-row:1] w-full resize-none h-24 rounded-lg px-6 py-3 text-grayishBlue border border-lightGray outline-none focus:border-moderateBlue md:max-w-[506px] flex-shrink"
                placeholder="Add a comment.."
            />
            <div class="w-full h-fit flex items-center justify-end md:w-auto">
                <Button
                    typeButton="default"
                    hasABackground
                    className="!w-[104px] !h-12"
                >
                    send
                </Button>
            </div>
        </form>
    );
}

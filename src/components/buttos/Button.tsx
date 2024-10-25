import { h } from 'preact';
import { clsx } from 'clsx';

interface Props {
    typeButton: "delete" | "reply" | "cancel" | "default" | "edit";
    hasABackground?: boolean;
    className?: string;
    children?: preact.ComponentChildren;
    icon?: preact.ComponentChildren;
}

const Button = ({ typeButton, hasABackground = false, className, children, icon }: Props) => {
    const btnDelete = hasABackground 
        ? "hover:bg-paleRed bg-softRed" 
        : "fill-softRed hover:fill-paleRed text-softRed hover:text-paleRed";

    const btnReply = hasABackground 
        ? "hover:bg-lightGrayishBlue bg-moderateBlue" 
        : "fill-moderateBlue hover:fill-lightGrayishBlue text-moderateBlue hover:text-lightGrayishBlue";

    const btnDefault = "hover:bg-lightGrayishBlue bg-moderateBlue";
    const btnCancel = "hover:bg-lightGrayishBlue bg-grayishBlue text-white";

    let btnClass;
    switch (typeButton) {
        case "delete":
            btnClass = btnDelete;
            break;
        case "reply":
        case "edit":
            btnClass = btnReply;
            break;
        case "cancel":
            btnClass = btnCancel;
            break;
        case "default":
            btnClass = btnDefault;
            break;
        default:
            btnClass = "";
            break;
    }

    return (
        <button
            className={clsx(
                "w-fit min-w-20 h-10 rounded-lg flex items-center justify-center gap-x-2 font-medium px-5 py-3 capitalize",
                hasABackground && "text-white !uppercase !min-w-24",
                className,
                btnClass
            )}
        >
            {!hasABackground && icon}
            {children}
        </button>
    );
};

export default Button;

import type { User } from "@types";

interface Props {
    user: User;
    onlyPhoto: boolean;
    isLoggedIn?: boolean;
    createdAt?: string;
    className?: string;
}
export default function Profile(props: Props) {
    const { onlyPhoto } = props;

    if (onlyPhoto) return Photo(props);

    return <UserInfo {...props} />
}


function UserInfo(props: Props) {
    const { user, isLoggedIn, createdAt } = props;
    return <div class={"flex items-center gap-x-2"}>
        <Photo {...props} />
        <h2 class={"font-medium"}>{user.username}</h2>
        {isLoggedIn && <p class={"bg-moderateBlue px-2 text-white font-medium  rounded"}>you</p>}
        <p class={"text-grayishBlue"}>{createdAt}</p>
    </div>
}

function Photo(props: Props) {
    const { user } = props;
    return <img
        src={`/${user.image.webp}`}
        alt={user.username}
        width={1000}
        height={1000}
        class={`w-8 h-8 md:w-10 md:h-10 object-cover rounded-full ${props.className}`}
    />
}
// App.tsx

import { CommentsProvider } from "@components/sections/CommentsContext";
import { CommentSection } from "@components/sections/CommentSection";
import data from "../data.json";
import type { User } from "@types";

const currentUser: User = data.currentUser;

export const App = () => {

    return (
        <CommentsProvider currentUsername={currentUser.username}>
            <CommentSection currentUser={currentUser} />
        </CommentsProvider>
    );
};

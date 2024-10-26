import type { User } from '@types';
import { CommentList } from './CommentList';
import CreateComment from './CommentCreate';
import { useComments } from './CommentsContext';
interface CommentSectionProps {
    currentUser: User;
}

export const CommentSection = ({ currentUser }: CommentSectionProps) => {
    const { comments, addComment } = useComments();


    return (
        <div className="max-w-md md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto p-4">
            <CommentList comments={comments} currentUser={currentUser} />
            <CreateComment
                user={currentUser}
                onSend={(text) => addComment(text, currentUser)}
            />
        </div>
    );
};

import type { CommentElement, User } from '@types';
import { CommentView } from './CommentView';

interface CommentProps {
    currentUser: User,
    comments: CommentElement[];
}

export const CommentList = ({ currentUser, comments }: CommentProps) => {
    return (
        <div className="space-y-4 mb-48 md:mb-32 2xl:mb-48">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentView key={comment.id} comment={comment}
                        currentUser={currentUser} />
                ))
            ) : (
                <p className="text-gray-500">No hay comentarios aún.</p>
            )}
        </div>
    )
}
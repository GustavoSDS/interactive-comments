import type { CommentElement } from '@types';
import { CommentView } from './CommentView';


export const CommentList = ({ comments }: { comments: CommentElement[] }) => {
    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentView key={comment.id} comment={comment} />
                ))
            ) : (
                <p className="text-gray-500">No hay comentarios aún.</p>
            )}
        </div>
    )
}
import type { CommentElement, User } from '@types';
import { useState, useEffect } from 'preact/hooks';
import { CommentList } from './CommentList';
import CreateComment from './CreateComment';

interface CommentSectionProps {
    currentUser: User;
    comments: CommentElement[];
}

export const CommentSection = ({ currentUser, comments: initialComments= [] }: CommentSectionProps) => {
    const [comments, setComments] = useState<CommentElement[]>(initialComments);

    useEffect(() => {
        setComments(initialComments || []);
    }, [initialComments]);

    const handleAddComment = (text: string) => {
        if (!text.trim()) return;

        const newComment: CommentElement = {
            id: Date.now(),
            content: text,
            user: currentUser,
            createdAt: "just now",
            score: 0,
        };

        setComments([newComment, ...comments]);
    };

    return (
        <div className="max-w-md md:max-w-xl mx-auto p-4 lg:p-8 xl:p-12">
            <CommentList comments={comments} />
            <CreateComment user={currentUser} onSend={handleAddComment} />
        </div>
    );
};

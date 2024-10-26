// CommentsContext.tsx
import { createContext } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import type { CommentElement, User } from '@types';
import data from '../../data.json';

// Propiedades del proveedor de comentarios
interface CommentsProviderProps {
    children: preact.ComponentChildren;
    currentUsername: string;
}

// Definición del contexto y de su tipo
interface CommentsContextProps {
    comments: CommentElement[];
    addComment: (text: string, user: User) => void;
    addReply: (text: string, parentId: number, user: User) => void;
    editComment: (id: number, newText: string) => void;
    deleteComment: (id: number) => void;
    upvoteComment: (userId: string) => void;
    downvoteComment: (userId: string) => void;
}

const CommentsContext = createContext<CommentsContextProps | null>(null);

// Hook para usar el contexto fácilmente en los componentes
export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) throw new Error('useComments debe usarse dentro de CommentsProvider');
    return context;
};

// Proveedor de comentarios
export const CommentsProvider = ({ children, currentUsername }: CommentsProviderProps) => {
    const [comments, setComments] = useState<CommentElement[]>([]);
    const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({});

    useEffect(() => {
        setComments(data.comments || []);
    }, []);

    // Función para agregar un comentario nuevo
    const addComment = (text: string, user: User) => {
        const newComment: CommentElement = {
            id: Date.now(),
            content: text,
            user,
            createdAt: "just now",
            score: 0,
            replies: [],
        };
        setComments([newComment, ...comments]);
    };

    // Función para agregar una respuesta a un comentario
    const addReply = (text: string, parentId: number, user: User) => {
        const reply: CommentElement = {
            id: Date.now(),
            content: text,
            user,
            createdAt: "just now",
            score: 0,
        };
        setComments(prev =>
            prev.map(comment =>
                comment.id === parentId
                    ? { ...comment, replies: [...(comment.replies || []), reply] }
                    : comment
            )
        );
    };

    // Función para editar un comentario o respuesta
    const editComment = (id: number, newText: string) => {
        const updateContent: any = (comment: CommentElement) => {
            if (comment.id === id) return { ...comment, content: newText };
            if (comment.replies) {
                return {
                    ...comment,
                    replies: comment.replies.map(updateContent),
                };
            }
            return comment;
        };
        setComments(comments.map(updateContent));
    };

    // Función para eliminar un comentario o respuesta
    const deleteComment = (commentId: number) => {
        setComments((prevComments) => {
            // Función recursiva para buscar y eliminar el comentario o respuesta
            const deleteRecursive = (commentsList: CommentElement[]): CommentElement[] => {
                return commentsList
                    .map(comment => {
                        // Si el comentario tiene respuestas, aplica la eliminación en ellas
                        if (comment.replies) {
                            return {
                                ...comment,
                                replies: deleteRecursive(comment.replies)
                            };
                        }
                        return comment;
                    })
                    // Filtra para eliminar el comentario con el ID correspondiente
                    .filter(comment => comment.id !== commentId);
            };

            // Aplica la eliminación a la lista principal de comentarios
            return deleteRecursive(prevComments);
        });
    };

    const upvoteComment = (userId: string) => {
        setComments((prevComments) => {
            return prevComments.map(comment => {
                const updateComment = (comment: CommentElement): CommentElement => {
                    if (comment.user.username === userId) {
                        // Evitar que el usuario vote en su propio comentario
                        if (comment.user.username === currentUsername) return comment;

                        if (userVotes[userId] !== "up") {
                            setUserVotes(prevVotes => ({ ...prevVotes, [userId]: "up" }));
                            return { ...comment, score: comment.score + 1 };
                        }
                    }
                    if (comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.map(updateComment),
                        };
                    }
                    return comment;
                };
                return updateComment(comment);
            });
        });
    };

    const downvoteComment = (userId: string) => {
        setComments((prevComments) => {
            return prevComments.map(comment => {
                const updateComment = (comment: CommentElement): CommentElement => {
                    if (comment.user.username === userId) {
                        // Evitar que el usuario vote en su propio comentario
                        if (comment.user.username === currentUsername) return comment;

                        if (userVotes[userId] !== "down") {
                            setUserVotes(prevVotes => ({ ...prevVotes, [userId]: "down" }));
                            return { ...comment, score: comment.score - 1 };
                        }
                    }
                    if (comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.map(updateComment),
                        };
                    }
                    return comment;
                };
                return updateComment(comment);
            });
        });
    };

    return (
        <CommentsContext.Provider value={{ comments, addComment, addReply, editComment, deleteComment, upvoteComment, downvoteComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

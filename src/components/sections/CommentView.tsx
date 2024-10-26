import { useState } from 'preact/hooks';
import { useComments } from './CommentsContext';
import type { CommentElement, User } from '@types';
import Profile from '@components/ui/Profile';
import CreateComment from './CommentCreate';
import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from '@components/ui/Icons';
import Button from '@components/ui/Button';

interface CommentProps {
    comment: CommentElement;
    currentUser: User;
}

export const CommentView = ({ comment, currentUser }: CommentProps) => {
    const { addReply, editComment, deleteComment, upvoteComment, downvoteComment } = useComments();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.content);

    const classBntDelete = isEditing ? "sm:absolute top-5 right-10" : "relative";

    return (
        <div class="flex flex-col gap-y-4">
            {/* Contenedor principal del comentario */}
            <div key={comment.id} class="p-4 rounded-md bg-white shadow-sm flex flex-col gap-y-4 relative">

                {/* Perfil y tiempo */}
                {comment.user.username === currentUser.username ? (
                    <Profile user={comment.user} onlyPhoto={false} isLoggedIn={true} createdAt={comment.createdAt} />
                ) : (
                    <Profile user={comment.user} onlyPhoto={false} createdAt={comment.createdAt} />
                )}

                {/* Contenido del comentario o editor */}
                {isEditing ? (
                    <textarea
                        class="w-full min-w-full resize-y min-h-fit max-h-64 h-full  rounded-lg px-6 py-3 text-grayishBlue border border-lightGray outline-none focus:border-moderateBlue flex-shrink [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-lightGrayishBlue [&::-webkit-scrollbar-thumb]:rounded-lg"
                        value={editedText}
                        rows={comment.content.length > 10 ? 5 : 3}
                        onInput={(e) => setEditedText((e.target as HTMLTextAreaElement).value)}
                    />
                ) : (
                    <p class="text-grayishBlue">{comment.content}</p>
                )}

                {/* Barra de interacción */}
                <div class="flex items-center justify-between">
                    {/* Botones de voto */}
                    <div class="flex gap-x-2 items-center bg-veryLightGray rounded-md h-10 min-w-16 sm:min-w-24">
                        <button
                            onClick={() => upvoteComment(comment.user.username)}
                            class="h-full w-full grid place-items-center border-none text-lightGrayishBlue hover:text-moderateBlue"
                        >
                            <IconPlus />
                        </button>
                        <p class="text-moderateBlue font-medium">{comment.score}</p>
                        <button
                            onClick={() => downvoteComment(comment.user.username)}
                            class="h-full w-full grid place-items-center border-none text-lightGrayishBlue hover:text-moderateBlue"
                        >
                            <IconMinus />
                        </button>
                    </div>

                    {/* Botones de acciones (Eliminar, Editar, Responder) */}
                    {comment.user.username === currentUser.username ? (
                        <div class="flex gap-x-2 sm:gap-x-4 items-center">
                            <Button typeButton="delete" onClick={()=>deleteComment(comment.id)} className={classBntDelete}>
                                <IconDelete />
                                delete
                            </Button>
                            {isEditing ? (
                                <Button
                                    typeButton="default"
                                    hasABackground
                                    className='!px-1 text-sm sm:text-base !min-w-10 sm:!min-w-24'
                                    onClick={() => {
                                        editComment(comment.id, editedText);
                                        setIsEditing(false);
                                    }}
                                >
                                    update
                                </Button>
                            ) : (
                                <Button typeButton="edit" className="!p-0" onClick={() => setIsEditing(true)}>
                                    <IconEdit />
                                    edit
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Button typeButton="reply" className="!p-0" onClick={()=>setIsReplying(!isReplying)}>
                            <IconReply />
                            Reply
                        </Button>
                    )}
                </div>
            </div>

            {/* Respuesta y subcomentarios */}
            {isReplying && (
                <div class="relative">
                    <CreateComment
                        user={currentUser}
                        onSend={(text) => {
                            addReply(text, comment.id, currentUser);
                            setIsReplying(false);
                        }}
                        isReply
                    />
                </div>
            )}

            {/* Lista de respuestas */}
            {comment.replies && comment.replies.length > 0 && (
                <div class="border-l pl-4 flex flex-col gap-y-4">
                    {comment.replies.map((reply) => (
                        <CommentView key={reply.id} comment={reply} currentUser={currentUser} />
                    ))}
                </div>
            )}
        </div>
    );
};
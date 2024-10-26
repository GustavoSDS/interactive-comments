import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from '../ui/icons';
import { useState } from 'preact/hooks';
import { useComments } from './CommentsContext';
import type { CommentElement, User } from '@types';
import Profile from '@components/ui/Profile';
import CreateComment from './CommentCreate';
import Button from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import clsx from 'clsx';

interface CommentProps {
    comment: CommentElement;
    currentUser: User;
}

export const CommentView = ({ comment, currentUser }: CommentProps) => {
    const { editComment, deleteComment, upvoteComment, downvoteComment } = useComments();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.content);
	const [isOpen, setIsOpen] = useState(false);

    const classBntDelete = isEditing ? "sm:absolute top-8 right-6" : "relative";

    return (
        <div class="flex flex-col gap-y-4 lg:gap-y-5">
            {/* Contenedor principal del comentario */}
            <div key={comment.id} class="p-4 md:p-6 rounded-md bg-white shadow-sm flex flex-col gap-4 md:flex-row-reverse md:items-start relative">

                <div class="w-full flex flex-col gap-y-4">
                    {/* Perfil y tiempo */}
                    {comment.user.username === currentUser.username ? (
                        <Profile user={comment.user} onlyPhoto={false} isLoggedIn={true} createdAt={comment.createdAt} className='!w-8 !h-8'/>
                    ) : (
                        <Profile user={comment.user} onlyPhoto={false} createdAt={comment.createdAt} className='!h-8 !w-8'/>
                    )}

                    {/* Contenido del comentario o editor */}
                    {isEditing ? (
                        <>
                            <textarea
                                class="w-full min-w-full resize-y min-h-36 md:min-h-28 max-h-64 h-full  rounded-lg px-6 py-3 text-grayishBlue border border-lightGray outline-none focus:border-moderateBlue flex-shrink [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-lightGrayishBlue [&::-webkit-scrollbar-thumb]:rounded-lg"
                                value={editedText}
                                onInput={(e) => setEditedText((e.target as HTMLTextAreaElement).value)}
                            />
                            <Button
                                typeButton="default"
                                hasABackground
                                className='!px-1 text-sm sm:text-base !min-w-10 sm:!min-w-24 hidden md:flex self-end'
                                onClick={() => {
                                    editComment(comment.id, editedText);
                                    setIsEditing(false);
                                }}
                            >
                                update
                            </Button>
                        </>
                    ) : (
                        <p class="text-grayishBlue">{comment.content}</p>
                    )}

                </div>

                {/* Barra de interacción */}
                <div class="flex items-center justify-between">
                    {/* Botones de voto */}
                    <div class="flex md:flex-col-reverse gap-x-0 sm:gap-x-2 items-center bg-veryLightGray rounded-md h-10 min-w-20 sm:min-w-24 md:min-w-10 md:min-h-24">
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
                        <div class={clsx("flex gap-x-2 sm:gap-x-4 items-center", !isEditing && "md:absolute top-8 right-6")}>
                            <Button typeButton="delete" onClick={() => setIsOpen(true)} className={classBntDelete}>
                                <IconDelete />
                                delete
                            </Button>

                            {isEditing ? (
                                <Button
                                    typeButton="default"
                                    hasABackground
                                    className='!px-1 text-sm sm:text-base !min-w-10 sm:!min-w-24 md:hidden'
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
                        <Button typeButton="reply" className="!p-0 md:absolute top-8 right-6" onClick={() => setIsReplying(!isReplying)}>
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
                            const newReply: CommentElement = {
                                id: Date.now(),
                                content: text,
                                user: currentUser,
                                createdAt: "just now",
                                score: 0,
                            };
                            comment.replies = [...(comment.replies || []), newReply];
                            setIsReplying(false);
                        }}
                        isReply
                    />
                </div>
            )}

            {/* Lista de respuestas */}
            {comment.replies && comment.replies.length > 0 && (
                <div class="border-l pl-4 md:pl-6 2xl:pl-11 lg:ml-6 2xl:ml-11 flex flex-col gap-y-4 lg:gap-y-6">
                    {comment.replies.map((reply) => (
                        <CommentView key={reply.id} comment={reply} currentUser={currentUser} />
                    ))}
                </div>
            )}


            <Modal isOpen={isOpen} handleDelete={() => deleteComment(comment.id)} handleCancel={() => setIsOpen(false)} />
        </div>
    );
};
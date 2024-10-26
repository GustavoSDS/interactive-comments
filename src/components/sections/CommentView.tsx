
import Button from '@components/ui/Button';
import Profile from '@components/ui/Profile';
import type { CommentElement } from '@types';
import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from '../ui/icons';

interface CommentViewProps {
    comment: CommentElement;
}

export const CommentView = ({ comment }: CommentViewProps) => {
    return (
        <div class="flex flex-col gap-y-4">
            <div key={comment.id} className="p-4 rounded-md bg-white shadow-sm flex flex-col gap-y-4">
                {comment.user.username === 'juliusomo'
                    ? (<Profile user={comment.user} onlyPhoto={false} isLoggedIn={true} createdAt={comment.createdAt} />)
                    : (<Profile user={comment.user} onlyPhoto={false} createdAt={comment.createdAt} />)}

                <p class="text-grayishBlue">{comment.content}</p>

                <div class="flex items-center justify-between">
                    <div class="flex gap-x-2 items-center bg-veryLightGray rounded-md h-10 min-w-24">
                        <button class="h-full w-full grid place-items-center border-none text-lightGrayishBlue hover:text-moderateBlue">
                            <IconPlus />
                        </button>
                        <p class="text-moderateBlue font-medium">{comment.score}</p>
                        <button class="h-full w-full grid place-items-center border-none text-lightGrayishBlue hover:text-moderateBlue" >
                            <IconMinus />
                        </button>
                    </div>
                    {
                        comment.user.username === 'juliusomo'
                        ? (
                            <div class="flex gap-x-4">
                                <Button typeButton='delete'>
                                    <IconDelete />
                                    delete
                                </Button>
                                <Button typeButton="edit" className='!p-0'>
                                    <IconEdit />
                                    edit
                                </Button>
                            </div>
                        ): (
                            <Button typeButton="reply" className='!p-0'>
                                <IconReply />
                                Reply
                            </Button>
                        )
                    }
                </div>
            </div>
            {
                comment.replies && comment.replies.length > 0
                && (
                    <div class="border-l border- pl-4 flex flex-col gap-y-4">
                        {
                            comment.replies.map((reply) => (
                                <CommentView key={reply.id} comment={reply} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
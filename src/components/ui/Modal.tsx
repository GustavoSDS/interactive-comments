import Button from '@components/ui/Button';
import clsx from 'clsx';
import { useState } from 'preact/hooks';

interface Props {
	isOpen: boolean;
	handleDelete: () => void;
	handleCancel: () => void;
}

export const Modal = ({ isOpen, handleDelete, handleCancel }: Props) => {

	return (
		<dialog
			class={clsx("fixed inset-0 top-0 left-0 justify-center items-center bg-black/50 z-10 h-screen w-screen", 
				isOpen ? "flex" : "hidden"
			)}
			onClick={handleCancel}
			>
			<div
				class="bg-white w-[400px] h-[252px] z-20 p-8 flex flex-col justify-between items-center gap-y-3 rounded-xl">
				<main class="flex flex-col gap-y-5">
					<h2 class="text-2xl font-medium">Delete comment</h2>
					<p class="leading-6">
						Are you sure you want to delete this comment? This will remove
						the comment and can’t be undone.
					</p>
				</main>
				<footer class="flex items-center justify-between w-full">
					<Button className="!min-w-40 py-2" typeButton="cancel" onClick={handleCancel}>
						no, cancel
					</Button>
					<Button className="!min-w-40" typeButton="delete" hasABackground onClick={handleDelete}>
						yes, delete
					</Button>
				</footer>
			</div>
		</dialog>
	)
}


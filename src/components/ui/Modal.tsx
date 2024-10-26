import Button from '@components/ui/Button';

export const Modal = () => {
	return (
		<dialog
			class="absolute inset-0 justify-center items-center bg-black/50 z-10 h-screen w-screen hidden" hidden>
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
					<Button className="!min-w-40" typeButton="cancel">
						no, cancel
					</Button>
					<Button className="!min-w-40" typeButton="delete" hasABackground>
						yes, delete
					</Button>
				</footer>
			</div>
		</dialog>
	)
}


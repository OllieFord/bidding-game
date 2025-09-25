<script>
	import logo from '$lib/assets/cover_image_energy_bidding.webp';
	import battery from '$lib/assets/battery_image.webp';
</script>

<div
	class=" image-wrapper absolute top-0 left-0 bottom-0 right-0 overflow-hidden z-0 object-cover"
	style="background-image: url({logo});"
></div>

<div class="z-10 flex flex-col h-full items-center">
	<div
		class=" mb-12 sm:mb-20 max-w-[calc(100vw/1.2)] md:max-w-[calc(100vw/1.2)] lg:max-w-[calc(100vw/1.7)] xl:max-w-[calc(100vw/2)] 2xl:max-w-[calc(100vw/2.5)] font-outline-2 text-black/80 px-10 py-8 rounded-xl bg-white/30 shadow-lg ring-1 backdrop-blur-md ring-black/5"
	>
		<div class="aspect-square bg-white/10 rounded-lg border border-white/30">
			<div class="relative w-full h-full">
				<div
					class="absolute top-24 right-24 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
				></div>
				<div
					class="absolute top-24 right-24 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
				></div>
				<div
					class="absolute top-24 right-24 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
				></div>
			</div>
		</div>

		<h1 class=" text-3xl sm:text-2xl font-black pb-1 pt-8 z-10 uppercase">Value Stacking Game</h1>
		<p class="text-md sm:text-sm font-medium uppercase">Optimizing for a cleaner future</p>

		<div class="flex flex-row justify-items-end justify-between z-10 mt-10 relative">
			<a
				href="/intro"
				class="px-3 py-1 text-lg font-black border-2 border-black text-Black backdrop-blur-md ring-black hover:bg-white/80 transition-transform focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
				>PLAY NOW</a
			>
			<a
				class="absolute bottom-0 right-0 font-semibold uppercase text-md flex-grow justify-end text-Black tracking-wide"
				href="/leaderboard">Leaderboard</a
			>
		</div>
	</div>
</div>

<style>
	.image-wrapper {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-size: cover;
	}

	.image-wrapper:after {
		height: 100vh;
		display: table-cell;
		content: '';
		overflow-y: scroll;
		visibility: hidden;
	}
</style>

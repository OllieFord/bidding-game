<script>
	import logo from '$lib/assets/cover_image_energy_bidding.png';
</script>



<div class=" image-wrapper absolute top-0 left-0 bottom-0 right-0 overflow-hidden z-0 object-cover" style="background-image: url({logo});">

</div>


<div class="z-10 flex flex-col h-full">
    <div class="mb-12 sm:mb-20 max-w-[calc(100vw/1.2)] md:max-w-[calc(100vw/1.2)] lg:max-w-[calc(100vw/1.7)] xl:max-w-[calc(100vw/2)] 2xl:max-w-[calc(100vw/2.5)]  font-outline-2 uppercase text-black/80 p-8 -ml-4 rounded-r-xl bg-white/10 shadow-lg ring-1 backdrop-blur-md ring-black/5">
        <h1 class=" text-3xl sm:text-6xl font-bold pb-4 sm:pb-6 z-10">Energy bidding <br> Game</h1>
        <p class="text-lg sm:text-2xl font-medium">Optimizing for a cleaner future</p>
    </div>

    <div class="flex flex-col items-center justify-center z-10">
        <a href="/game" class="px-8 py-4 text-4xl border border-gray-300 font-medium text-Black bg-white hover:bg-gray-100 hover:scale-105 transition-transform focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-center ">PLAY NOW</a>
        <a class="p-4 font-semibold uppercase text-xl text-white tracking-wide" href="/leaderboard">Leaderboard</a>
    </div>
</div>


<style>


    .image-wrapper{
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
        content: "";
        overflow-y: scroll;
        visibility: hidden;
    }
</style>





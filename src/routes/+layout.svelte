<script>
  import "../app.css";
</script>


<nav class=" flex flex-row p-4 uppercase font-semibold tracking-wide bg-white rounded-lg mb-4 items-center shadow-sm">
    <div class="mr-auto font-bold text-lg">
        Bidding Game
    </div>
    <ul class=" hidden sm:flex flex-row space-x-4 sm:space-x-8  justify-end">
        <li>
            <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   ">Home</a>
        </li>
        <li>
            <a href="/game" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   ">Game</a>
        </li>
        <li>
            <a href="/leaderboard" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   ">Leaderboard</a>
        </li>
    </ul>
</nav>



<slot />


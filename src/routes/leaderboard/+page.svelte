<script>

  /** @type {import('./$types').PageData} */
  export let data;
</script>
<div class="flex flex-col justify-center items-center">
<h1 class="text-4xl font-bold pb-6">Bidding Game Leaderboard</h1>
    <table class=" max-w-md w-full text-base text-left rtl:text-right text-gray-500  border border-gray-500 shadow-md overflow-hidden rounded-lg">
        <thead class="text-md text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Rank
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Score
                </th>
            </tr>
        </thead>
 <tbody>
{#if data}
  {#each data.leaderboard as item, i}
    <tr class="odd:bg-white  even:bg-gray-50  border-b dark:bg-gray-800 ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {i+1}
                </th>
                <td class="px-6 py-4">
                    {item.name}
                </td>
                <td class="px-6 py-4 font-medium" style="font-size: {Math.max(24 - i * 2, 14)}px;">
                    {item.score}
                </td>
            </tr>
  {/each}
{:else}
<div>
    No data
</div>
{/if}
</tbody>

</table>

</div>

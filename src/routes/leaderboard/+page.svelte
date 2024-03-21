<script>

  /** @type {import('./$types').PageData} */
  export let data;

// Create a temporary object to hold groups
const tempGroups = {};

// Group entries by group_number
data.leaderboard.forEach(entry => {
    if (!tempGroups[entry.group_number]) {
        tempGroups[entry.group_number] = [];
    }
    tempGroups[entry.group_number].push(entry);
});

// Sort each group by score
for (const groupNumber in tempGroups) {
    tempGroups[groupNumber].sort((a, b) => b.score - a.score);
}

// Transform the groups object into an iterable array of group objects
const groupsArray = Object.keys(tempGroups).map(groupNumber => ({
    group_number: parseInt(groupNumber, 10),
    members: tempGroups[groupNumber],
}));


console.log(groupsArray)


</script>
<div class="flex flex-col justify-center items-center">
<h1 class="text-4xl font-bold pb-6">Bidding Game Leaderboard</h1>
{#if data}
<div class="flex flex-row gap-x-8">
    {#each groupsArray as group}
        <div>
        <h3 class="pb-3 font-medium text-lg uppercase ">Group {group.group_number}</h3>
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

    {#each group.members as item, i}
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
    </tbody>

    </table>
    </div>
{/each}
</div>
{:else}
<div>
    No data
</div>
{/if}
</div>

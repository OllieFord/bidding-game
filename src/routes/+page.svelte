<script>
   
   import Chart from '$lib/chart.svelte';
   import Battery_chart from '$lib/battery_chart.svelte';
   import Timer from "$lib/timer.svelte";
   


   import { data } from '../lib/data.js'


   const startingValue = 0
   const fineMultiplication = 3


    let ptus = Array(24).fill().map((_, i) => i); // Example PTUs
    let selectedValues = Array(ptus.length).fill("0"); // Default to '0' for all
    let chargeState = Array(ptus.length).fill(startingValue)

    let estimatedRevenue = {
        upper: Array(ptus.length).fill(0),
        value: Array(ptus.length).fill(0),
        lower: Array(ptus.length).fill(0)
    };


    function reset() {
        estimatedRevenue = {
            upper: Array(ptus.length).fill(0),
            value: Array(ptus.length).fill(0),
            lower: Array(ptus.length).fill(0)
        }
        chargeState = Array(ptus.length).fill(startingValue)
        selectedValues = Array(ptus.length).fill("0");
    }

    function sum(array) {
        return array.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
                },0);
    }


    function getItem(array, index) {
        if (index === -1) {
            return startingValue;
        }
        return array[index];
        }

    function toggleOptionByValue(selectId, value) {
        const selectElement = document.getElementById(selectId);
        const optionToToggle = selectElement.querySelector(`option[value="${value}"]`);
        if (optionToToggle) {
            // Toggle the disabled state
            optionToToggle.disabled = !optionToToggle.disabled;
        }
    }


    function calculateChargeState(index, state) {

        let currentChargeState = getItem(chargeState, index - 1)
        let currentAction = selectedValues[index]

        //  When we do nothing
        if (state == "0") {
            estimatedRevenue.upper[index] = 0
            estimatedRevenue.lower[index] = 0
            estimatedRevenue.value[index] = 0
            return currentChargeState
        }

        //When we want to charge
        if (state == "1") {
            if (currentChargeState > 50) {
                selectedValues[index] = "0"
                estimatedRevenue.upper[index] = 0
                estimatedRevenue.lower[index] = 0
                estimatedRevenue.value[index] = 0
                return currentChargeState
  
            } else {
                estimatedRevenue.upper[index] = -(data[index].spot_price )
                estimatedRevenue.lower[index] = -(data[index].spot_price )
                estimatedRevenue.value[index] = -(data[index].spot_price )
                return currentChargeState + 50
            }
        }

        // When we want to sell to FCRD
        if (state == "2") {
            if (currentChargeState <= 0) {
                estimatedRevenue.upper[index] = 0
                estimatedRevenue.lower[index] = 0
                estimatedRevenue.value[index] = 0
                selectedValues[index] = "0"
                return currentChargeState
            } else {
                estimatedRevenue.upper[index]  = (data[index].spot_price)
                estimatedRevenue.lower[index]  = (data[index].spot_price)
                estimatedRevenue.value[index]  = (data[index].spot_price)
                return currentChargeState - 50
            }

        }

        // When we want to sell to FCRN
        if (state == "3") {
            if (currentChargeState <= 0) {
                estimatedRevenue.upper[index]  = -(data[index].fcr_n_price_upper) * fineMultiplication
                estimatedRevenue.lower[index]  = -(data[index].fcr_n_price_lower) * fineMultiplication
                estimatedRevenue.value[index]  = ((estimatedRevenue.upper[index] + estimatedRevenue.lower[index]) / 2)
                return currentChargeState
            } else if (currentChargeState > 50) {
                estimatedRevenue.upper[index]  = -(data[index].fcr_n_price_upper) * fineMultiplication
                estimatedRevenue.lower[index]  = -(data[index].fcr_n_price_lower) * fineMultiplication
                estimatedRevenue.value[index]  = ((estimatedRevenue.upper[index] + estimatedRevenue.lower[index]) / 2)
                return currentChargeState
            } else {
                estimatedRevenue.upper[index]  = (data[index].fcr_n_price_upper)
                estimatedRevenue.lower[index]  = (data[index].fcr_n_price_lower) 
                estimatedRevenue.value[index]  = ((estimatedRevenue.upper[index] + estimatedRevenue.lower[index]) / 2)
                return currentChargeState

            }
        }

        return currentChargeState
    }

    // Function to update a specific PTU's selected value
    function updateSelectedValue(index, value) {
        selectedValues[index] = value;
        for (let i = 0; i < chargeState.length; i++) {
            chargeState[i] = calculateChargeState(i, selectedValues[i])
            }
        console.log(selectedValues)
    }

</script>

<div class="h-20 fixed top-0 right-0 ">
    <Timer/>
</div>


<dialog id="modal" class="backdrop:bg-gray-800/50 p-4 relative bg-white rounded-lg shadow dark:bg-gray-700 ">
    <div id="extralarge-modal" tabindex="-1" class=" w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    RULES
                </h3>
                <button type="button" class="text-gray-400 p-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <form method="dialog">
                        <button autofocus onclick="modal.close()">Close</button>
                    </form>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <h2 class="text-lg font-bold">OBJECTIVE</h2>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You want to generate as much revenue as possible for the whole day.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You have a 1MW / 2MWh BESS which is at 50 % SoC in the beginning of the day. You have 3 options per PTU: sell it to FCR-N, charge it or discharge it with the day-ahead market prices. There are 8 PTUs.
                </p>
                <h3 class="text-md font-medium">FCR-N</h3>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You receive the FCR-N price for a PTU, it is sold for 1MW. If you sell it to FCR-N the SoC must be at 50%, otherwise you get fines for 3 x price. After the FCR-N hour the battery will be at 50% SoC. There are no energy costs for selling it to FCR-N.
                </p>
                <h3 class="text-md font-medium">CHARGE</h3>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You pay the day-ahead price for 1MWh. If you charge the BESS during a PTU, the SoC will increase by 50%, so you can charge the BESS for 2 consecutive PTUs if the BESS is at 0% in the beginning of the first hour. If you charge the BESS and the SoC is already 100%, nothing happens during that PTU, and you pay/receive nothing.
                </p>
                <h3 class="text-md font-medium">DISCHARGE</h3>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You receive the day-ahead price for 1MWh. If you discharge the BESS during a PTU, the SoC will decrease by 50%, so you can discharge the BESS for 2 consecutive PTUs if the BESS is at 100% in the beginning of the first hour. If you discharge the BESS and the SoC is already at 0%, nothing happens during that PTU, and you pay/receive nothing. 
                </p>
                <h3 class="text-md font-medium">NOTHING</h3>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You can also choose to not to bid
                </p>
                

            </div>
        </div>
    </div>
</div>

</dialog>



<button class="fixed top-[72px] right-0 p-2 sm:p-4 z-50 bg-black rounded-bl-lg shadow-md text-white font-bold tracking-wide" onclick="modal.showModal()">RULES</button>

<button class="fixed top-[128px] right-0 p-2 sm:p-4 z-50 bg-red-600 rounded-l-lg shadow-md text-white font-bold tracking-wide" on:click={reset}>RESET</button>

<main class="w-full">
    <h1 class="text-4xl pb-6 ">Welcome to the Energy bidding Game!</h1>
    

    <div class="w-full h-80 flex sm:flex-row  gap-3 py-2 ">
        <div class=" sm:px-4 grid-span-1  ">
            <h2 class="text-xl mb-2 sm:mb-4 font-bold">Current Estimated Revenue</h2>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Upper Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.upper).toFixed(2)}</div>
            </div>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Average Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.value).toFixed(2)}</div>
            </div>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Lower Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.lower).toFixed(2)}</div>
            </div>
        </div>
        <Chart />
        
    </div>


    <div class="w-full sm:h-64 flex flex-col sm:flex-row  gap-3 py-2">
        <div class=" sm:px-4 grid-span-1  ">
            <h2 class="text-xl mb-2 sm:mb-4 font-bold">Current Estimated Revenue</h2>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Upper Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.upper).toFixed(2)}</div>
            </div>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Average Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.value).toFixed(2)}</div>
            </div>
            <div class="flex flex-row w-full justify-between items-center">
                <div class="text-xs from-neutral-600">Lower Estimate </div>
                <div class="sm:p-2 font-bold text-lg">{sum(estimatedRevenue.lower).toFixed(2)}</div>
            </div>
        </div>
        
        
            <Battery_chart {chargeState}></Battery_chart>
            <!-- <div id="battery-chart" style="width: 100%; height:100%;"></div> -->
        
        
         
    </div>

<!-- 
    <div class="flex flex-row overflow-scroll sm:overflow-x-scroll ">

        {#each ptus as ptu, index}

            <div class="py-2 px-4 m-1 border border-gray-300 rounded-md flex flex-col">
                <div class="mb-2">
                    {ptu}:00
                </div>
                <div class="w-32">
                <select name="select" id={`select-${ptu}`} bind:value={selectedValues[index]} on:change={() => updateSelectedValue(index, selectedValues[index])} class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="0">No Bid</option>
                    <option value="1">Charge</option>
                    <option value="2">Discharge</option>
                    <option value="3">FCR-N</option>
                </select>
                </div>

            </div>
        {/each}
    </div> -->

    


    <!-- <div class="flex flex-row justify-evenly w-full pb-4 mb-16 grid grid-flow-row "> -->
    <div class=" grid grid-flow-col grid-cols-5"> 
        <div class=" rounded-md sm:px-4 text-sm font-bold flex flex-col gap-1 justify-evenly col-span-1 ">
                <div class="mb-2 uppercase tracking-tight ">
                   Bidding Controls
                </div>
                <div class="flex-grow flex flex-col ">
                
                    <div class="flex flex-grow items-center ">
                        No Bid
                    </div>
                    <div class="flex flex-grow items-center">
                        Charge
                    </div>
                    <div class="flex flex-grow items-center">
                        Discharge
                    </div>
                    <div class="flex flex-grow items-center">
                        FCR-N
                    </div>
                    </div>
                
        </div>

        <div class="flex flex-row flex-grow justify-evenly col-span-4">

        {#each ptus as ptu, index}

            <div class=" border-gray-300 rounded-md text-center flex flex-col text-xs gap-1 ">
                <div class="mb-2 font-medium tracking-tight ">
                    {#if ptu < 10}
                        0{ptu}:00
                    {:else}
                        {ptu}:00
                    {/if}
                </div>

                <fieldset>
                    {#if estimatedRevenue.value[index].toFixed(0) < 0}
                    <div class="font-medium text-red-600">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>
                    {:else if estimatedRevenue.value[index].toFixed(0) > 0}
                    <div class="font-medium text-emerald-600">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>
                    {:else}
                    <div class="font-medium">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>

                    {/if}

                    <div>
                        <input class="hidden radio" type="radio" id={`no-bid-${ptu}`} name={`select-${ptu}`} value="0" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '0')}  checked />
                        <label class="radio-label inline-block p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`no-bid-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`charge-${ptu}`} name={`select-${ptu}`} value="1" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '1')}  />
                        <label class="radio-label inline-block p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`charge-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`discharge-${ptu}`} name={`select-${ptu}`} value="2" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '2')}  />
                        <label class="radio-label inline-block p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`discharge-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`fcrn-${ptu}`} name={`select-${ptu}`} value="3" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '3')}  />
                        <label class="radio-label inline-block p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`fcrn-${ptu}`}></label>
                    </div>
                </fieldset>
            </div>
        {/each}
        </div>
    </div>
    

  
 
</main>


<style>

    .radio:checked + .radio-label {
        background-color: #e5e5e5; /* Background of selected button */
        border-color: #a3a3a3; /* Border color of selected button */
        border-radius: 6px;
    }
</style>





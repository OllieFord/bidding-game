<script>
   
   import Chart from '$lib/chart.svelte';
   import Battery_chart from '$lib/battery_chart.svelte';
   import Timer from "$lib/timer.svelte";
   import { data } from '../../lib/data.js'
   import Modal from '$lib/Modal.svelte';
   import { enhance } from '$app/forms';

	let showModal = false;


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
                // selectedValues[index] = "0"
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
                // selectedValues[index] = "0"
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
    }


    /** @type {import('./$types').ActionData} */
    export let form;

</script>


<!-- <div class="h-20 fixed top-0 right-0 ">
    <Timer/>
</div> -->


<dialog id="modal" class="backdrop:bg-gray-800/50 p-4 relative bg-white rounded-lg shadow ">
    <div id="extralarge-modal" tabindex="-1" class=" w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow ">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 class="text-xl font-medium text-gray-900 ">
                    RULES
                </h3>
                <button type="button" class="text-gray-400 p-4 bg-transparent hover:scale-105 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="extralarge-modal">
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
                <p class="text-base leading-relaxed text-gray-500">
                    You want to generate as much revenue as possible for the whole day.
                </p>
                <p class="text-base leading-relaxed text-gray-500 ">
                    You have a 1MW / 2MWh BESS which is at 50 % SoC in the beginning of the day. You have 3 options per PTU: sell it to FCR-N, charge it or discharge it with the day-ahead market prices. There are 8 PTUs.
                </p>
                <h3 class="text-md font-medium">FCR-N</h3>
                <p class="text-base leading-relaxed text-gray-500 ">
                    You receive the FCR-N price for a PTU, it is sold for 1MW. If you sell it to FCR-N the SoC must be at 50%, otherwise you get fines for 3 x price. After the FCR-N hour the battery will be at 50% SoC. There are no energy costs for selling it to FCR-N.
                </p>
                <h3 class="text-md font-medium">CHARGE</h3>
                <p class="text-base leading-relaxed text-gray-500 ">
                    You pay the day-ahead price for 1MWh. If you charge the BESS during a PTU, the SoC will increase by 50%, so you can charge the BESS for 2 consecutive PTUs if the BESS is at 0% in the beginning of the first hour. If you charge the BESS and the SoC is already 100%, nothing happens during that PTU, and you pay/receive nothing.
                </p>
                <h3 class="text-md font-medium">DISCHARGE</h3>
                <p class="text-base leading-relaxed text-gray-500 ">
                    You receive the day-ahead price for 1MWh. If you discharge the BESS during a PTU, the SoC will decrease by 50%, so you can discharge the BESS for 2 consecutive PTUs if the BESS is at 100% in the beginning of the first hour. If you discharge the BESS and the SoC is already at 0%, nothing happens during that PTU, and you pay/receive nothing. 
                </p>
                <h3 class="text-md font-medium">NOTHING</h3>
                <p class="text-base leading-relaxed text-gray-500 ">
                    You can also choose to not to bid
                </p>
                

            </div>
        </div>
    </div>
</div>

</dialog>

<Modal bind:showModal>
	<h2 slot="header" class="font-medium text-xl">
		Sumbit score to leaderboard
	</h2>

    <div class="flex flex-row px-8 pt-8 pb-4 justify-center items-center">
        <div style="width: auto; height: 100%;"><svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="64"><g clip-path="url(#clip0_5880_37773)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37773"><rect width="18.8235" height="32" fill="white" transform="translate(0.453125 0.000488281)"></rect></clipPath></defs></svg></div>
        <div class="font-bold text-6xl px-3">{Math.round(sum(estimatedRevenue.value).toFixed(2))}</div>
        <div style="width: auto; height: 100%;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" fill="none" height="64"><g clip-path="url(#clip0_5880_37786)"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37786"><rect width="18.8235" height="32" fill="white" transform="matrix(-1 0 0 1 19.1016 0.000488281)"></rect></clipPath></defs></svg></div>
    </div>
    <div class="flex flex-row justify-center items-center">
        Your Score
    </div>
    <form class="py-4 px-2 space-y-4" method="POST" use:enhance action="?/addScore">
        {#if form?.missing}<p class="error text-red-500">Please enter your name.</p>{/if}
        <label class="block mb-2 text-sm font-medium text-gray-900">
            Name
            <input name="name" value={form?.name ?? ''} type="text" class="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5">
        </label>
        <label style="display: none;">
            Score
            <input name="score" type="text" value={Math.round(sum(estimatedRevenue.value).toFixed(2))}>
        </label>
        <div class="flex flex-row justify-end">
            <button class="text-white bg-black hover:scale-105 focus:ring-4 transition-all focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" formaction="?/addScore">Submit</button>
        </div>
    </form> 

</Modal>

<div class="!display sm:hidden p-4 text-center">
    <div>
        <strong>Sorry!</strong> 
    </div>
    <div>
        <br> This game hasn't been optimised for mobile!
    </div>
        
    </div>

<main class="hidden sm:block w-full">

    <div class="flex flex-col sm:flex-row w-full flex-grow h-vh">
        <div class="flex flex-col pr-4 min-h-[488px] h-auto space-y-4">
            <div class="px-4 bg-white rounded-lg shadow-sm py-4">
                <h2 class="text-xl mb-1 leading-5 font-normal ">Estimated Revenue</h2>
                
                <div class="flex flex-row w-full justify-between items-center">
                    <div class=" font-normal text-4xl">{sum(estimatedRevenue.value).toFixed(1)}</div>
                </div>
            </div>

            <div class="  bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="w-full h-full relative">
                    <Timer/>
                </div>
                
            </div>

            <div class="flex flex-row gap-4 rounded-lg">
                <button class="px-4 py-3 z-50 w-full bg-white border border-gray-300 hover:scale-105 hover:text-neurtal-800 transition-all rounded-lg shadow-sm text-neurtal-800 font-medium tracking-wide" onclick="modal.showModal()">RULES</button>
                <button class="px-4 py-3 z-50 w-full bg-red-600 hover:scale-105  rounded-lg shadow-md transition-all text-white font-bold tracking-wide" on:click={reset}>RESET</button>
            </div>


            <div class="rounded-lg ">
                <button class="px-4 py-3 bg-blue-700 hover:scale-105  rounded-lg shadow-md text-white font-normal transition-all tracking-wide" on:click={() => (showModal = true)}> Submit to Leaderboard </button>
            </div>

            <div class="hidden sm:block !mt-auto text-sm font-bold z-50 pb-4 -mr-2">
                    <div class="flex-grow flex flex-col">
                        <div class="flex flex-grow items-center justify-end h-6">
                            Revenue
                        </div>
                    
                        <div class="flex flex-grow items-center justify-end h-[26px] mb-[3.5px] ">
                            No Bid
                        </div>
                        <div class="flex flex-grow items-center justify-end h-[26px] mb-[3.5px]">
                            Charge
                        </div>
                        <div class="flex flex-grow items-center justify-end h-[26px] mb-[3.5px]">
                            Discharge
                        </div>
                        <div class="flex flex-grow items-center justify-end h-[26px]">
                            FCR-N
                        </div>
                        </div>
                    
            </div>

        </div>
        

        <div class=" overflow-x-scroll sm:overflow-auto flex flex-col flex-grow h-vh bg-white p-4 rounded-lg shadow-sm">
            <div class="h-64 w-full">
                <Chart />
            </div>
            <div class="h-52 pb-6 ">
            <Battery_chart {chargeState}></Battery_chart>
            </div>

        <div class="mb-2 ">
            <div class="font-bold uppercase tracking-tight">Bidding Controls</div>
            <div class="font-medium text-sm text-gray-600 tracking-tight">Click on the squares to make a bid</div>
        </div>
        <div class="flex flex-row flex-grow justify-between pl-4 col-span-4">
            

        {#each ptus as ptu, index}

            <div class=" border-gray-300 rounded-md text-center flex flex-col text-xs gap-1 ">
                <div class="mb-2 font-medium tracking-tight ">
                    {#if ptu < 10}
                        0{ptu}
                    {:else}
                        {ptu}
                    {/if}
                </div>

                <fieldset>
                    {#if estimatedRevenue.value[index].toFixed(0) < 0}
                    <div class="font-bold pb-1 text-red-600">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>
                    {:else if estimatedRevenue.value[index].toFixed(0) > 0}
                    <div class="font-bold pb-1 text-emerald-600">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>
                    {:else}
                    <div class="font-bold pb-1">
                        {estimatedRevenue.value[index].toFixed(0)}
                    </div>

                    {/if}

                    <div>
                        <input class="hidden radio" type="radio" id={`no-bid-${ptu}`} name={`select-${ptu}`} value="0" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '0')}  checked />
                        <label class="radio-label inline-block p-3 border border-gray-500 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`no-bid-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`charge-${ptu}`} name={`select-${ptu}`} value="1" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '1')}  />
                        <label class="radio-label inline-block p-3 border border-gray-500 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`charge-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`discharge-${ptu}`} name={`select-${ptu}`} value="2" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '2')}  />
                        <label class="radio-label inline-block p-3 border border-gray-500 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`discharge-${ptu}`}></label>
                    </div>
                    <div>
                        <input class="hidden radio" type="radio" id={`fcrn-${ptu}`} name={`select-${ptu}`} value="3" bind:group={selectedValues[ptu]} on:change={() => updateSelectedValue(ptu, '3')}  />
                        <label class="radio-label inline-block p-3 border border-gray-500 rounded-md cursor-pointer hover:bg-blue-100 hover:border-blue-500" for={`fcrn-${ptu}`}></label>
                    </div>
                </fieldset>
            </div>
        {/each}
        </div>
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





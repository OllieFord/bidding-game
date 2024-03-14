function getItem(array, index) {
    if (index === -1) {
        return 0;
    }
    return array[index];
}

export function sum(array) {
    return array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
}



export function createChargeStateArray(selectedValues) {

    let chargeState = Array(selectedValues.length).fill(0)

    for (let i = 0; i < selectedValues.length; i++) {

        let state = selectedValues[i]


        if (state == "0") {
            chargeState[i] = getItem(chargeState, i - 1)
        }

        if (state == "1") {
            if (getItem(chargeState, i - 1) > 50) {
                chargeState[i] = getItem(chargeState, i - 1)
            } else {
                chargeState[i] = getItem(chargeState, i - 1) + 50
            }
        }

        if (state == "2") {
            if (getItem(chargeState, i - 1) <= 0) {
                chargeState[i] = getItem(chargeState, i - 1)
            } else {
                chargeState[i] = getItem(chargeState, i - 1) - 50
            }

        }

        if (state == "3") {
            chargeState[i] = getItem(chargeState, i - 1)
        }
    }

    return chargeState

}

export function estimateRevenue(selectedValues, chargeState, data) {

    let fineMultiplication = 3

    let estimatedRevenue = {
        upper: Array(24).fill(0),
        value: Array(24).fill(0),
        lower: Array(24).fill(0)
    };


    for (let i = 1; i < chargeState.length; i++) {

        let state = selectedValues[i]
        let previousChargeState = getItem(chargeState, i - 1)
        let priceIndex = i - 1


        if (state == "0") {
            estimatedRevenue.upper[priceIndex] = 0
            estimatedRevenue.lower[priceIndex] = 0
            estimatedRevenue.value[priceIndex] = 0
        }

        if (state == "1") {
            if (previousChargeState > 50) {
                estimatedRevenue.upper[priceIndex] = 0
                estimatedRevenue.lower[priceIndex] = 0
                estimatedRevenue.value[priceIndex] = 0

            } else {
                estimatedRevenue.upper[priceIndex] = -(data[priceIndex].spot_price)
                estimatedRevenue.lower[priceIndex] = -(data[priceIndex].spot_price)
                estimatedRevenue.value[priceIndex] = -(data[priceIndex].spot_price)

            }
        }

        if (state == "2") {
            if (previousChargeState <= 0) {
                estimatedRevenue.upper[priceIndex] = 0
                estimatedRevenue.lower[priceIndex] = 0
                estimatedRevenue.value[priceIndex] = 0

            } else {
                estimatedRevenue.upper[priceIndex] = (data[priceIndex].spot_price)
                estimatedRevenue.lower[priceIndex] = (data[priceIndex].spot_price)
                estimatedRevenue.value[priceIndex] = (data[priceIndex].spot_price)

            }

        }

        if (state == "3") {
            if (previousChargeState <= 0 || previousChargeState > 50) {
                estimatedRevenue.upper[priceIndex] = -(data[priceIndex].fcr_n_price_upper) * fineMultiplication;
                estimatedRevenue.lower[priceIndex] = -(data[priceIndex].fcr_n_price_lower) * fineMultiplication;
                estimatedRevenue.value[priceIndex] = ((estimatedRevenue.upper[priceIndex] + estimatedRevenue.lower[priceIndex]) / 2);

            } else {
                estimatedRevenue.upper[priceIndex] = data[priceIndex].fcr_n_price_upper;
                estimatedRevenue.lower[priceIndex] = data[priceIndex].fcr_n_price_lower;
                estimatedRevenue.value[priceIndex] = ((estimatedRevenue.upper[priceIndex] + estimatedRevenue.lower[priceIndex]) / 2);

            }
        }

    }

    return estimatedRevenue
}
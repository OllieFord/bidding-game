import { sql } from "@vercel/postgres";
import { fail, redirect } from '@sveltejs/kit';
import { data } from '../../lib/data.js'
import { estimateRevenue, createChargeStateArray, sum } from '$lib/calculations.js'


const correctAnswer = 23


function calculateScore(selectedValues, data) {



    let chargeState = createChargeStateArray(selectedValues)
    let estimatedRevenue = estimateRevenue(selectedValues, chargeState, data)

    return sum(estimatedRevenue.value)

}

function calculateTieBreaker(rightAnswer, teamAnswer) {
    return Math.max(0, 100 * (1 - (Math.abs(rightAnswer - teamAnswer) / rightAnswer)));
}




async function addEntry(name, score) {
    await sql`
    INSERT INTO leaderboard (name, score)
    VALUES (${name}, ${score});
  `;
}

export const actions = {
    addScore: async ({ request }) => {

        const response = await request.formData();

        const name = response.get('name');
        const selectedValues = JSON.parse(response.get('selectedValues[]'));
        const numberOfBids = response.get('numberOfBids');


        let score = calculateScore(selectedValues, data)
        let tiebreaker = calculateTieBreaker(correctAnswer, numberOfBids)

        let finalScore = Math.round((score + tiebreaker).toFixed(2))


        if (!name) {
            return fail(400, {
                name,
                missing: true
            })
        }

        await addEntry(name, finalScore)
        redirect(303, '/leaderboard');

    }
};
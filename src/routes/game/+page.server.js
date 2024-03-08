import { sql } from "@vercel/postgres";
import {fail, redirect } from '@sveltejs/kit';

async function addEntry(name, score) {
    await sql`
    INSERT INTO leaderboard (name, score)
    VALUES (${name}, ${score});
  `;
}

export const actions = {
    addScore: async ({ request }) => {

        const data = await request.formData();

        const name = data.get('name');
        const score = data.get('score');

        console.group(name)

        if (!name) {
            return fail(400, {
                name,
                missing: true
            })
        }

        await addEntry(name, score)
        redirect(303, '/leaderboard');

    }
};
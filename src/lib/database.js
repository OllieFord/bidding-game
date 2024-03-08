import { sql } from "@vercel/postgres";


async function addEntry(name, score) {
    await sql`
    INSERT INTO leaderboard (name, score)
    VALUES (${name}, ${score});
  `;
}
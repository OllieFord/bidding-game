import { createPool, sql } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";


async function seed() {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      score FLOAT NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
    
    console.log(`Created "leaderboard" table`)

    const leaderboard = await Promise.all([
        sql`
          INSERT INTO leaderboard (name, score)
          VALUES ('Ollie', 300.0);
      `,
    
    ])

    console.log(`Seeded ${leaderboard.length} entries`)

    return {
        createTable,
        leaderboard
    }
}


export async function load() {

    try {
        const { rows: leaderboard } = await sql`SELECT * FROM leaderboard ORDER BY score DESC`;
        return {
            leaderboard: leaderboard,
        }
    } catch (error) {
        if (error?.message === `relation "leaderboard" does not exist`) {
            console.log(
                'Table does not exist, creating and seeding it with dummy data now...'
            )
            // Table is not created yet
            await seed()
            const { rows: leaderboard } = await sql`SELECT * FROM leaderboard ORDER BY score DESC`;
            return {
                leaderboard: leaderboard,
            }
        } else {
            throw error
        }
    }
}



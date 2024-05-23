import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DBURL
});

async function createUsersTable() {
    await client.connect();
    try {
        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log(result);
    } catch (error) {
        console.error('Error creating users table:', error);
    } finally {
        await client.end();
    }
}

// createUsersTable();


// async function to insert data into a table
async function insertData(){
    try {
        await client.connect();
        const insertQuery =`INSERT INTO users (username, email, password) VALUES ('username2','user3@example.com','somepassword')`;
        const res = await client.query(insertQuery);
        console.log('Insertion success:' , res); 
    }catch(err){
        console.error('Error during the insertion:' , err)
    }finally{
        await client.end();
    }
}

insertData()
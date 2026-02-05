import dotenv from "dotenv"
dotenv.config()

console.log("Full DB URL:", process.env.MONGODB_URL)
console.log("Type:", typeof process.env.MONGODB_URL)
console.log("Length:", process.env.MONGODB_URL ? process.env.MONGODB_URL.length : 0)

if (process.env.MONGODB_URL) {
    const url = process.env.MONGODB_URL;
    console.log("First char code:", url.charCodeAt(0));
    console.log("Last char code:", url.charCodeAt(url.length - 1));
}

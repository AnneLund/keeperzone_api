import { exit } from "process";
import { seedDepartments, seedUsers, seedClubs } from "./misc/seed.mjs";

/*

    This is our default setup for a seeding file - it is low key and primitive until we have found
    the struture for our projects.

*/

console.log("----------------------");
console.log("KeeperZone");
console.log("Seeding files");
console.log("----------------------\n");

await seedUsers();
await seedClubs();
await seedDepartments();
// await seedProducts();
// await seedReviews();
// await seedSubscribers();

console.log("\n----------------------");
console.log("Seeding files completed");
console.log("----------------------");

exit();

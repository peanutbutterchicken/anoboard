const adjectives = [
    "Goofy",
    "Cringe",
    "Sus",
    "Musty",
    "Greasy",
    "Silly",
    "Weird",
    "Clumsy",
    "Nosy",
    "Lazy",
    "Chaotic",
    "Salty",
    "Feral",
    "Awkward",
    "Dramatic",
    "Cursed",
    "Smelly",
    "Corny",
    "Unhinged",
    "Broke",
    "Sassy",
    "Zesty",
    "Sketchy",
    "Derpy",
    "Bonkers"
];


const animals = [
    "Askal",
    "Puspin",
    "Kalabaw",
    "Tarsier",
    "Butanding",
    "Unggoy",
    "Tilapia",
    "Bangus",
    "Tambakol",
    "Palaka",
    "Bayawak",
    "Ahas",
    "Lamok",
    "Ipis",
    "Daga",
    "Tikling",
    "Agila",
    "Manok",
    "Baboy",
    "Kambing",
    "Gecko",
    "Pusa",
    "Langgam",
    "Kabayo",
    "Baka"
 ];

export default function generateName(){
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomNumber = Math.floor(100 + Math.random() * 900);
    return `${randomAdjective}${randomAnimal}${randomNumber}`;
}


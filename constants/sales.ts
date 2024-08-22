import {faker} from '@faker-js/faker'

// List of Swahili wild animals
const swahiliWildAnimals = [
    'Simba', // Lion
    'Tembo', // Elephant
    'Kiboko', // Hippo
    'Twiga', // Giraffe
    'Pundamilia', // Zebra
    'Chui', // Leopard
    'Ngiri', // Warthog
    'Nyati', // Buffalo
    'Kiboko', // Hippopotamus
    'Fisi', // Hyena
    'Duma', // Cheetah
    'Swara', // Antelope
    'Nyoka', // Snake
    'Sungura', // Hare
];

// Generate a random status
const getRandomStatus = () => {
    const statuses = ['active', 'inactive', 'pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate random JSON data
const generateData = (numClients = 5) => {
    const clients = [];

    for (let i = 0; i < numClients; i++) {
        const numPlots = Math.floor(Math.random() * 5) + 1; // 1 to 5 plots
        const plots = [];

        for (let j = 0; j < numPlots; j++) {
            const animalName = faker.helpers.arrayElement(swahiliWildAnimals);
            plots.push({
                name: animalName,
            });
        }

        clients.push({
            clientName: faker.company.name(),
            plots: plots,
            createdAt: faker.date.past().toISOString(),
            status: getRandomStatus(),
        });
    }

    return clients;
};

// Generate and log the data
export const sales = generateData(100); // Change the number to generate more or fewer clients


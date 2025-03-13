// Example card database
const cardDatabase = [
  { name: "Luffy", type: "Character", rarity: "Rare", attack: 5, health: 10 },
  { name: "Zoro", type: "Character", rarity: "Common", attack: 3, health: 7 },
  { name: "Ace", type: "Character", rarity: "Super Rare", attack: 8, health: 12 },
  { name: "Event - Fire Fist", type: "Event", rarity: "Uncommon", effect: "Deal 3 damage to enemy character" },
  // Add more cards here...
];

// Rarity distribution (probabilities)
const rarityDistribution = {
  "Common": 0.7,
  "Uncommon": 0.2,
  "Rare": 0.07,
  "Super Rare": 0.03
};

// Function to simulate pulling a pack
function pullPack() {
  const packSize = 10; // Number of cards in a pack
  const pulledCards = [];
  
  for (let i = 0; i < packSize; i++) {
    const rarity = getRandomRarity();
    const cardPool = cardDatabase.filter(card => card.rarity === rarity);
    const randomCard = getRandomCard(cardPool);
    pulledCards.push(randomCard);
  }
  
  return pulledCards;
}

// Function to get a random rarity based on distribution
function getRandomRarity() {
  const rand = Math.random();
  let cumulativeProbability = 0;
  
  for (const [rarity, probability] of Object.entries(rarityDistribution)) {
    cumulativeProbability += probability;
    if (rand < cumulativeProbability) {
      return rarity;
    }
  }
}

// Function to get a random card from a given pool
function getRandomCard(cardPool) {
  const randIndex = Math.floor(Math.random() * cardPool.length);
  return cardPool[randIndex];
}

// Function to display pulled cards in the UI
function openPack() {
  const pulledPack = pullPack();
  const packContainer = document.getElementById("pack");
  packContainer.innerHTML = ""; // Clear the previous pack

  pulledPack.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `<strong>${card.name}</strong><br>Rarity: ${card.rarity}<br>Type: ${card.type}`;
    packContainer.appendChild(cardDiv);
  });
}

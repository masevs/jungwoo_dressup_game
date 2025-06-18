// Define all game assets with their paths
const ASSETS = {
    'background_main_menu': 'assets/background/main_menu.png',
    'background_dress_up_room': 'assets/background/dress_up_room.png',
    'background_credits': 'assets/background/credits.png',
    'playlights': 'assets/background/playlights.png',
    // Removed: 'jungwoolights': 'assets/background/jungwoolights.png',
    'body_upper': 'assets/body/upperBody.png',
    'body_lower': 'assets/body/lowerBody.png',
    'body_foot': 'assets/body/foot.png',
    // Tops
    'top_1': 'assets/tops/tops1.png', 'top_2': 'assets/tops/tops2.png', 'top_3': 'assets/tops/tops3.png',
    'top_4': 'assets/tops/tops4.png', 'top_5': 'assets/tops/tops5.png', 'top_6': 'assets/tops/tops6.png',
    'top_7': 'assets/tops/tops7.png', 'top_8': 'assets/tops/tops8.png', 'top_9': 'assets/tops/tops9.png',
    'top_10': 'assets/tops/tops10.png', 'top_11': 'assets/tops/tops11.png',
    // Pants
    'pants_1': 'assets/pants/pants1.png', 'pants_2': 'assets/pants/pants2.png', 'pants_3': 'assets/pants/pants3.png',
    'pants_4': 'assets/pants/pants4.png', 'pants_5': 'assets/pants/pants5.png', 'pants_6': 'assets/pants/pants6.png',
    'pants_7': 'assets/pants/pants7.png',
    // Accessories
    'bag_1': 'assets/accessories/bag1.png', 'bag_2': 'assets/accessories/bag2.png', 'bag_3': 'assets/accessories/bag3.png',
    'bag_4': 'assets/accessories/bag4.png', 'bag_5': 'assets/accessories/bag5.png',
    'shoes_1': 'assets/accessories/shoes1.png', 'shoes_2': 'assets/accessories/shoes2.png', 'shoes_3': 'assets/accessories/shoes3.png',
    'sunglass': 'assets/accessories/sunglass.png',
    // Audio
    'audio_walk': 'assets/audio/walk nct 127 tetris version.mp3'
};

// Define clothing categories and their items
const CLOTHING_ITEMS = {
    'tops': [
        'top_1', 'top_2', 'top_3', 'top_4', 'top_5', 'top_6', 'top_7', 'top_8', 'top_9', 'top_10', 'top_11'
    ],
    'pants': [
        'pants_1', 'pants_2', 'pants_3', 'pants_4', 'pants_5', 'pants_6', 'pants_7'
    ],
    // Split accessories into distinct types for clearer management
    'bags': [
        'bag_1', 'bag_2', 'bag_3', 'bag_4', 'bag_5'
    ],
    'shoes': [
        'shoes_1', 'shoes_2', 'shoes_3'
    ],
    'sunglasses': [ // Treat sunglass as a single toggle item
        'sunglass'
    ]
};

// Base resolution for coordinate calculations - CONFIRMED FOR 1080x1920 PORTRAIT
const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1920;

// Hotspot coordinates (x1, y1, x2, y2) relative to BASE_WIDTH x BASE_HEIGHT
const HOTSPOTS = {
    'mainMenu': {
        // Play button: based on previous visual estimations, assuming it's near the center
        'playButton': { x1: 450, y1: 850, x2: 650, y2: 950 },
        // Credits button: Updated as per user's provided coordinates (bounding box derived from points)
        'creditsButton': { x1: 700, y1: 446, x2: 953, y2: 1555 }
    },
    'dressUpRoom': {
        'topBox': { x1: 76, y1: 396, x2: 274, y2: 582 },
        'bottomBox': { x1: 76, y1: 716, x2: 281, y2: 905 },
        'accessoriesBox': { x1: 76, y1: 1052, x2: 287, y2: 1244 },
        'backButton': { x1: 76, y1: 1644, x2: 287, y2: 1756 }
    },
    'creditsPage': {
        'backButton': { x1: 34, y1: 35, x2: 293, y2: 99 }
    }
};

// Positioning for Jungwoo body parts and clothing items relative to BASE_WIDTH x BASE_HEIGHT
// Assuming all body parts and clothing items are provided as 1080x1920 sprites
// with transparent backgrounds, designed to overlay perfectly across the full game canvas.
const ITEM_POSITIONS = {
    'upperBody': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'lowerBody': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'foot': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'tops': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'pants': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'bags': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'shoes': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT },
    'sunglasses': { x: 0, y: 0, width: BASE_WIDTH, height: BASE_HEIGHT }
};

// Z-index values for layering (higher value means on top)
const Z_INDEX = {
    'body': 10,
    'pants': 20,
    'tops': 30,
    'shoes': 40,
    'bags': 50,
    'sunglasses': 60
};

// Game state variables
let currentPage = 'main-menu-page';
let selectedTops = null;
let selectedPants = null;
let selectedShoes = null; // Stores the currently selected shoe key, or null
let selectedBag = null;   // Stores the currently selected bag key, or null
let sunglassActive = false; // True if sunglass is active, false otherwise

// Accessory cycling state
let accessorySelectionMode = 0; // 0: Bags, 1: Shoes, 2: Sunglass Toggle


// DOM elements
const gameContainer = document.getElementById('game-container');
const mainMenuPage = document.getElementById('main-menu-page');
const dressUpRoomPage = document.getElementById('dress-up-room-page');
const creditsPage = document.getElementById('credits-page');

const playLightsOverlay = document.getElementById('play-lights-overlay');
// Removed: const jungwooLightsOverlay = document.getElementById('jungwoo-lights-overlay');

const musicControlBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const backgroundMusic = document.getElementById('background-music');

const upperBodyImg = document.getElementById('upperBody');
const lowerBodyImg = document.getElementById('lowerBody');
const footImg = document.getElementById('foot');

const topsContainer = document.getElementById('tops-container');
const pantsContainer = document.getElementById('pants-container');
const shoesContainer = document.getElementById('shoes-container');
const accessoriesContainer = document.getElementById('accessories-container');

const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOkButton = document.getElementById('message-ok-button');

// Initialize object to store loaded images
const loadedImages = {};

/**
 * Shows a custom message box instead of alert.
 * @param {string} message The message to display.
 */
function showMessage(message) {
    messageText.innerHTML = message; // Use innerHTML to allow line breaks
    messageBox.style.display = 'block';
}

/**
 * Hides the custom message box.
 */
function hideMessage() {
    messageBox.style.display = 'none';
}

/**
 * Preloads all assets (images and audio).
 * @returns {Promise<void>} A promise that resolves when all assets are loaded.
 */
async function preloadAssets() {
    const imagePromises = [];
    // Combine all image keys from ASSETS and CLOTHING_ITEMS for preloading
    const allImageKeys = new Set();
    for (const key in ASSETS) {
        if (ASSETS[key].endsWith('.png')) {
            allImageKeys.add(key);
        }
    }
    // Add clothing item keys to the set
    for (const category in CLOTHING_ITEMS) {
        CLOTHING_ITEMS[category].forEach(key => allImageKeys.add(key));
    }


    for (const key of allImageKeys) {
        let imagePath = ASSETS[key]; // Directly use the path from ASSETS
        if (!imagePath) {
             console.warn(`Asset path not found in ASSETS for key: ${key}. Attempting fallback path.`);
             // Construct a fallback path based on common clothing item structure if not directly in ASSETS
             const parts = key.split('_');
             const inferredCategory = parts[0]; // e.g., 'top', 'pants', 'bag', 'shoes', 'sunglass'
             
             let categoryFolder = inferredCategory;
             if (inferredCategory === 'bag' || inferredCategory === 'shoes' || inferredCategory === 'sunglass') {
                 categoryFolder = 'accessories'; // bags, shoes, and sunglasses all go in 'accessories' folder
             } else if (inferredCategory === 'top') {
                 categoryFolder = 'tops';
             } else if (inferredCategory === 'pants') {
                 categoryFolder = 'pants';
             }

             imagePath = `assets/${categoryFolder}/${key}.png`;
             console.log(`Trying fallback path: ${imagePath}`);
        }

        imagePromises.push(new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imagePath;
            img.onload = () => {
                loadedImages[key] = img.src; // Store the URL that successfully loaded
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${imagePath}`);
                // Removed specific message for jungwoolights.png typo
                showMessage(`Failed to load ${imagePath}. Please check your asset filenames and folder structure.`);
                
                // Fallback to placeholder for images if they fail to load
                const placeholderUrl = `https://placehold.co/100x100/CCCCCC/000000?text=${key.toUpperCase()}`; // Make text more visible
                const placeholderImg = new Image();
                placeholderImg.src = placeholderUrl;
                placeholderImg.onload = () => {
                    loadedImages[key] = placeholderImg.src; // Store placeholder URL
                    resolve();
                };
                placeholderImg.onerror = () => {
                    console.error(`Failed to load placeholder for ${key}`);
                    reject(new Error(`Failed to load placeholder for ${key}`));
                };
            };
        }));
    }

    // Audio is handled by the <audio> tag itself, just ensure the source is set
    backgroundMusic.src = ASSETS['audio_walk'];

    try {
        await Promise.all(imagePromises);
        console.log('All images preloaded successfully!');
    } catch (error) {
        console.error('Error preloading assets:', error);
        // The more specific showMessage will be triggered by individual image.onerror
    }
}

/**
 * Resizes and positions an element based on base coordinates and current screen size.
 * @param {HTMLElement} element The HTML element to position.
 * @param {Object} coords The base coordinates {x, y, width, height}.
 * @param {number} baseWidth The base width for calculation (e.g., 1080).
 * @param {number} baseHeight The base height for calculation (e.g., 1920).
 */
function positionElement(element, coords, baseWidth, baseHeight) {
    const currentWidth = gameContainer.offsetWidth;
    const currentHeight = gameContainer.offsetHeight;

    element.style.left = `${(coords.x / baseWidth) * 100}%`;
    element.style.top = `${(coords.y / baseHeight) * 100}%`;
    if (coords.width) {
        element.style.width = `${(coords.width / baseWidth) * 100}%`;
    }
    if (coords.height) {
        element.style.height = `${(coords.height / baseHeight) * 100}%`;
    }
}

/**
 * Checks if a click event occurred within a given hotspot.
 * @param {MouseEvent} event The click event.
 * @param {Object} hotspotCoords The hotspot coordinates {x1, y1, x2, y2}.
 * @param {number} baseWidth The base width for calculation.
 * @param {number} baseHeight The base height for calculation.
 * @returns {boolean} True if the click is within the hotspot, false otherwise.
 */
function isClickedWithinHotspot(event, hotspotCoords, baseWidth, baseHeight) {
    const rect = gameContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left; // X relative to game container
    const clickY = event.clientY - rect.top; // Y relative to game container

    // Scale hotspot coordinates to current container size
    const scaledX1 = (hotspotCoords.x1 / baseWidth) * rect.width;
    const scaledY1 = (hotspotCoords.y1 / baseHeight) * rect.height;
    const scaledX2 = (hotspotCoords.x2 / baseWidth) * rect.width;
    const scaledY2 = (hotspotCoords.y2 / baseHeight) * rect.height;

    return (
        clickX >= scaledX1 &&
        clickX <= scaledX2 &&
        clickY >= scaledY1 &&
        clickY <= scaledY2
    );
}

/**
 * Switches the active game page.
 * @param {string} pageId The ID of the page to activate.
 */
function showPage(pageId) {
    document.querySelectorAll('.game-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;

    // Set background and overlay images based on the active page
    if (pageId === 'main-menu-page') {
        document.getElementById('main-menu-bg').src = loadedImages['background_main_menu'];
        // Removed: jungwooLightsOverlay.src = loadedImages['jungwoolights'];
        playLightsOverlay.src = loadedImages['playlights'];
    } else if (pageId === 'dress-up-room-page') {
        document.getElementById('dress-up-room-bg').src = loadedImages['background_dress_up_room'];
        // Ensure body parts are visible when entering dress-up room
        upperBodyImg.style.display = 'block';
        lowerBodyImg.style.display = 'block';
        footImg.style.display = 'block';
    } else if (pageId === 'credits-page') {
        document.getElementById('credits-bg').src = loadedImages['background_credits'];
    }

    // Reset overlays on page change
    playLightsOverlay.classList.remove('active');
    // Removed: jungwooLightsOverlay.classList.remove('active');
    // Removed: jungwooLightsOverlay.style.opacity = 0.1; // Reset dim light
}

/**
 * Toggles the background music playback.
 */
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(e => {
            console.error("Failed to play music:", e);
            showMessage("Music playback requires user interaction. Please click anywhere on the game to allow audio playback.");
        });
        musicIcon.textContent = '⏸️'; // Pause icon
    } else {
        backgroundMusic.pause();
        musicIcon.textContent = '🎵'; // Music icon
    }
}

/**
 * Populates the dress-up room with initial body parts and clothing item layers.
 */
function initializeDressUpRoom() {
    // Set initial src for body parts and their z-index
    upperBodyImg.src = loadedImages['body_upper'];
    upperBodyImg.style.zIndex = Z_INDEX.body;

    lowerBodyImg.src = loadedImages['body_lower'];
    lowerBodyImg.style.zIndex = Z_INDEX.body;

    footImg.src = loadedImages['body_foot'];
    footImg.style.zIndex = Z_INDEX.body;

    // Position body parts (now full 1080x1920)
    positionElement(upperBodyImg, ITEM_POSITIONS.upperBody, BASE_WIDTH, BASE_HEIGHT);
    positionElement(lowerBodyImg, ITEM_POSITIONS.lowerBody, BASE_WIDTH, BASE_HEIGHT);
    positionElement(footImg, ITEM_POSITIONS.foot, BASE_WIDTH, BASE_HEIGHT);

    // Create img elements for all clothing items but keep them hidden
    const createAndAppendItem = (container, category, key, zIndex) => {
        const img = document.createElement('img');
        img.id = `${category}-${key.replace(/_/g, '-')}`;
        img.classList.add('clothing-item');
        img.src = loadedImages[key];
        img.style.zIndex = zIndex; // Assign z-index here

        positionElement(img, ITEM_POSITIONS[category], BASE_WIDTH, BASE_HEIGHT);
        container.appendChild(img);
        return img;
    };

    CLOTHING_ITEMS.tops.forEach(key => {
        createAndAppendItem(topsContainer, 'tops', key, Z_INDEX.tops);
    });
    CLOTHING_ITEMS.pants.forEach(key => {
        createAndAppendItem(pantsContainer, 'pants', key, Z_INDEX.pants);
    });
    CLOTHING_ITEMS.bags.forEach(key => {
        createAndAppendItem(accessoriesContainer, 'bags', key, Z_INDEX.bags);
    });
    CLOTHING_ITEMS.shoes.forEach(key => {
        createAndAppendItem(accessoriesContainer, 'shoes', key, Z_INDEX.shoes);
    });
    CLOTHING_ITEMS.sunglasses.forEach(key => {
        createAndAppendItem(accessoriesContainer, 'sunglasses', key, Z_INDEX.sunglasses);
    });

     // Ensure all clothing items are initially hidden
    document.querySelectorAll('.clothing-item').forEach(item => item.style.display = 'none');

     // Display body parts
    upperBodyImg.style.display = 'block';
    lowerBodyImg.style.display = 'block';
    footImg.style.display = 'block';
}

/**
 * Handles selecting a single item from a category (tops, pants, bags, shoes).
 * If the same item is clicked, it's unselected. Otherwise, the old is hidden, new is shown.
 * @param {string} category The category ('tops', 'pants', 'bags', 'shoes').
 * @param {string[]} itemKeys An array of asset keys for items in this category.
 */
function selectExclusiveItem(category, itemKeys) {
    // Get all items of this category by ID pattern (e.g., 'tops-top-1')
    const items = itemKeys.map(key => document.getElementById(`${category}-${key.replace(/_/g, '-')}`));

    let currentlySelectedKey;
    if (category === 'tops') currentlySelectedKey = selectedTops;
    else if (category === 'pants') currentlySelectedKey = selectedPants;
    else if (category === 'bags') currentlySelectedKey = selectedBag;
    else if (category === 'shoes') currentlySelectedKey = selectedShoes;

    let currentIndex = currentlySelectedKey ? itemKeys.indexOf(currentlySelectedKey) : -1;
    let nextIndex = (currentIndex + 1) % (itemKeys.length + 1); // +1 for "none" option

    // Hide all items in the category
    items.forEach(item => {
        if (item) item.style.display = 'none';
    });

    // Update the selected item state
    if (nextIndex < itemKeys.length) {
        const nextItemKey = itemKeys[nextIndex];
        const nextItemElement = document.getElementById(`${category}-${nextItemKey.replace(/_/g, '-')}`);
        if (nextItemElement) {
            nextItemElement.style.display = 'block';
            if (category === 'tops') selectedTops = nextItemKey;
            else if (category === 'pants') selectedPants = nextItemKey;
            else if (category === 'bags') selectedBag = nextItemKey;
            else if (category === 'shoes') selectedShoes = nextItemKey;
            console.log(`Selected ${category}: ${nextItemKey}`);
        }
    } else {
        // If it's the "none" option
        if (category === 'tops') selectedTops = null;
        else if (category === 'pants') selectedPants = null;
        else if (category === 'bags') selectedBag = null;
        else if (category === 'shoes') selectedShoes = null;
        console.log(`Deselected all ${category}.`);
    }

    // Handle lowerBody and foot visibility based on pants/shoes
    if (category === 'pants') {
        if (selectedPants) {
            lowerBodyImg.style.display = 'none';
        } else {
            lowerBodyImg.style.display = 'block';
        }
    }
    if (category === 'shoes') {
        if (selectedShoes) {
            footImg.style.display = 'none';
        } else {
            footImg.style.display = 'block';
        }
    }
}

/**
 * Toggles the visibility of a non-exclusive accessory (like sunglasses).
 * @param {string} itemKey The asset key of the accessory to toggle.
 * @param {string} elementIdPrefix The prefix used for the element's ID (e.g., 'sunglasses').
 */
function toggleIndependentAccessory(itemKey, elementIdPrefix) {
    const itemElement = document.getElementById(`${elementIdPrefix}-${itemKey.replace(/_/g, '-')}`);
    if (!itemElement) {
        console.error(`Accessory element not found: ${itemKey}`);
        return;
    }

    if (itemElement.style.display === 'block') {
        itemElement.style.display = 'none';
        sunglassActive = false; // Only for sunglass
        console.log(`Sunglass: OFF`);
    } else {
        itemElement.style.display = 'block';
        sunglassActive = true; // Only for sunglass
        console.log(`Sunglass: ON`);
    }
}


/**
 * Handles clicks on the main menu page.
 * @param {MouseEvent} event The click event.
 */
function handleMainMenuClick(event) {
    // Check Play button first
    if (isClickedWithinHotspot(event, HOTSPOTS.mainMenu.playButton, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Play button hotspot clicked!'); // Debugging log
        // Removed: jungwooLightsOverlay.classList.add('active'); // Dim light effect
        // Removed: jungwooLightsOverlay.style.opacity = 0.8; // Make it more visible when activated

        playLightsOverlay.classList.add('active'); // Luminous effect
        setTimeout(() => {
            playLightsOverlay.classList.remove('active'); // Turn off after a short delay
            showPage('dress-up-room-page');
        }, 300); // Short delay for animation
        return; // Important: Exit after handling a click, prevents multiple detections if hotspots overlap
    }

    // Then check Credits button
    if (isClickedWithinHotspot(event, HOTSPOTS.mainMenu.creditsButton, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Credits button hotspot clicked!'); // Debugging log
        showPage('credits-page');
        return; // Exit after handling click
    }
}

/**
 * Handles clicks on the dress-up room page.
 * @param {MouseEvent} event The click event.
 */
function handleDressUpRoomClick(event) {
    if (isClickedWithinHotspot(event, HOTSPOTS.dressUpRoom.topBox, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Top box hotspot clicked!'); // Debugging log
        selectExclusiveItem('tops', CLOTHING_ITEMS.tops);
    } else if (isClickedWithinHotspot(event, HOTSPOTS.dressUpRoom.bottomBox, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Bottom box hotspot clicked!'); // Debugging log
        selectExclusiveItem('pants', CLOTHING_ITEMS.pants);
    } else if (isClickedWithinHotspot(event, HOTSPOTS.dressUpRoom.accessoriesBox, BASE_WIDTH, BASE_HEIGHT)) {
        console.log(`Accessories box hotspot clicked! Current Mode: ${accessorySelectionMode}`);

        if (accessorySelectionMode === 0) { // Cycle Bags
            selectExclusiveItem('bags', CLOTHING_ITEMS.bags);
            // If the last bag option (or no bag) was selected, move to next mode
            if (selectedBag === null) { // This condition is true when all bags have been cycled through
                 accessorySelectionMode = 1; // Move to Shoes mode
                 console.log('Mode changed to: Shoes selection mode (Mode 1).');
            }

        } else if (accessorySelectionMode === 1) { // Cycle Shoes
            selectExclusiveItem('shoes', CLOTHING_ITEMS.shoes);
            // If the last shoe option (or no shoe) was selected, move to next mode
            if (selectedShoes === null) { // This condition is true when all shoes have been cycled through
                accessorySelectionMode = 2; // Move to Sunglass Toggle mode
                console.log('Mode changed to: Sunglass toggle mode (Mode 2).');
            }

        } else if (accessorySelectionMode === 2) { // Toggle Sunglass
            toggleIndependentAccessory('sunglass', 'sunglasses');
            accessorySelectionMode = 0; // Reset to Bags mode after toggling sunglass
            console.log('Mode changed to: Bags selection mode (Mode 0).');
        }

    } else if (isClickedWithinHotspot(event, HOTSPOTS.dressUpRoom.backButton, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Dress-up back button hotspot clicked!'); // Debugging log
        showPage('main-menu-page');
    }
}

/**
 * Handles clicks on the credits page.
 * @param {MouseEvent} event The click event.
 */
function handleCreditsClick(event) {
    if (isClickedWithinHotspot(event, HOTSPOTS.creditsPage.backButton, BASE_WIDTH, BASE_HEIGHT)) {
        console.log('Credits back button hotspot clicked!'); // Debugging log
        showPage('main-menu-page');
    }
}

/**
 * Main click handler for the game container, dispatches based on current page.
 * @param {MouseEvent} event The click event.
 */
function handleGameClick(event) {
    switch (currentPage) {
        case 'main-menu-page':
            handleMainMenuClick(event);
            break;
        case 'dress-up-room-page':
            handleDressUpRoomClick(event);
            break;
        case 'credits-page':
            handleCreditsClick(event);
            break;
    }
}

/**
 * Adjusts the size and position of all hotspots based on the current game container size.
 */
function resizeHotspots() {
    const hotSpotElements = {
        'play-hotspot': HOTSPOTS.mainMenu.playButton,
        'credits-hotspot': HOTSPOTS.mainMenu.creditsButton,
        'top-box-hotspot': HOTSPOTS.dressUpRoom.topBox,
        'bottom-box-hotspot': HOTSPOTS.dressUpRoom.bottomBox,
        'accessories-box-hotspot': HOTSPOTS.dressUpRoom.accessoriesBox,
        'dress-up-back-hotspot': HOTSPOTS.dressUpRoom.backButton,
        'credits-back-hotspot': HOTSPOTS.creditsPage.backButton
    };

    for (const id in hotSpotElements) {
        const element = document.getElementById(id);
        if (element) {
            const coords = hotSpotElements[id];
            positionElement(element, {
                x: coords.x1,
                y: coords.y1,
                width: coords.x2 - coords.x1,
                height: coords.y2 - coords.y1
            }, BASE_WIDTH, BASE_HEIGHT);
        }
    }

    // Also re-position body and clothing items (now full 1080x1920 overlays)
    positionElement(upperBodyImg, ITEM_POSITIONS.upperBody, BASE_WIDTH, BASE_HEIGHT);
    positionElement(lowerBodyImg, ITEM_POSITIONS.lowerBody, BASE_WIDTH, BASE_HEIGHT);
    positionElement(footImg, ITEM_POSITIONS.foot, BASE_WIDTH, BASE_HEIGHT);

    CLOTHING_ITEMS.tops.forEach(key => {
        const img = document.getElementById(`tops-${key.replace(/_/g, '-')}`);
        if (img) positionElement(img, ITEM_POSITIONS.tops, BASE_WIDTH, BASE_HEIGHT);
    });
    CLOTHING_ITEMS.pants.forEach(key => {
        const img = document.getElementById(`pants-${key.replace(/_/g, '-')}`);
        if (img) positionElement(img, ITEM_POSITIONS.pants, BASE_WIDTH, BASE_HEIGHT);
    });
    CLOTHING_ITEMS.bags.forEach(key => {
        const img = document.getElementById(`bags-${key.replace(/_/g, '-')}`);
        if (img) positionElement(img, ITEM_POSITIONS.bags, BASE_WIDTH, BASE_HEIGHT);
    });
    CLOTHING_ITEMS.shoes.forEach(key => {
        const img = document.getElementById(`shoes-${key.replace(/_/g, '-')}`);
        if (img) positionElement(img, ITEM_POSITIONS.shoes, BASE_WIDTH, BASE_HEIGHT);
    });
    CLOTHING_ITEMS.sunglasses.forEach(key => {
        const img = document.getElementById(`sunglasses-${key.replace(/_/g, '-')}`);
        if (img) positionElement(img, ITEM_POSITIONS.sunglasses, BASE_WIDTH, BASE_HEIGHT);
    });
}


// Event Listeners
window.addEventListener('load', async () => {
    await preloadAssets();
    initializeDressUpRoom(); // Prepare clothing elements
    resizeHotspots(); // Initial positioning
    showPage('main-menu-page'); // Start on main menu

    // Add an immediate click listener to the body/container to allow music playback
    // This is a common workaround for autoplay policies.
    const allowMusic = () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Music play blocked, waiting for user click."));
            musicIcon.textContent = '⏸️';
        }
        document.removeEventListener('click', allowMusic); // Remove listener after first attempt
    };
    document.addEventListener('click', allowMusic, { once: true }); // Listen once

});

window.addEventListener('resize', resizeHotspots); // Re-position on resize
gameContainer.addEventListener('click', handleGameClick); // Main game click handler
musicControlBtn.addEventListener('click', toggleMusic); // Music control button
messageOkButton.addEventListener('click', hideMessage); // OK button for message box

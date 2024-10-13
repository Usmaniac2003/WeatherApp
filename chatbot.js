// // Dialogflow configuration
// const dialogflowAPIUrl = 'https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent';
// const accessToken = 'YOUR_ACCESS_TOKEN'; // Use OAuth or API key to authenticate

// // DOM elements
// const chatInput = document.getElementById('chat-input');
// const sendButton = document.getElementById('send-button');
// const chatbotResponseArea = document.getElementById('chatbot-response');

// // Event listener for send button
// sendButton.addEventListener('click', () => {
//     const userInput = chatInput.value.trim();
//     if (userInput) {
//         sendMessageToChatbot(userInput);
//     }
//     chatInput.value = ''; // Clear the input field after sending
// });

// // Function to send message to the Dialogflow API
// async function sendMessageToChatbot(userMessage) {
//     const queryInput = {
//         queryInput: {
//             text: {
//                 text: userMessage,
//                 languageCode: 'en'
//             }
//         }
//     };

//     try {
//         const response = await fetch(dialogflowAPIUrl, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(queryInput)
//         });

//         const responseData = await response.json();
//         displayChatbotResponse(responseData);
//     } catch (error) {
//         console.error('Error connecting to the Dialogflow API:', error);
//         chatbotResponseArea.innerHTML = `<p>Sorry, I couldn't process your request. Please try again later.</p>`;
//     }
// }

// // Function to display chatbot response in the UI
// function displayChatbotResponse(data) {
//     const result = data.queryResult;
//     const fulfillmentText = result.fulfillmentText || 'Sorry, I didn’t understand that. Could you ask in a different way?';

//     // Display the chatbot's reply
//     chatbotResponseArea.innerHTML = `<p>${fulfillmentText}</p>`;
// }

// // Functions for additional chatbot logic to handle weather data from the table
// function calculateTemperatureStats() {
//     const rows = document.querySelectorAll('#forecast-table tbody tr');
//     let temperatures = [];

//     rows.forEach(row => {
//         const tempCell = row.cells[1].textContent.replace(' °C', ''); // Remove the "°C" part
//         temperatures.push(parseFloat(tempCell));
//     });

//     const highest = Math.max(...temperatures);
//     const lowest = Math.min(...temperatures);
//     const average = (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(2);

//     return { highest, lowest, average };
// }

// // Extend the chatbot logic to handle queries like "highest, lowest, average temperature"
// function handleChatbotQueries(query) {
//     if (query.includes('highest') || query.includes('lowest') || query.includes('average')) {
//         const stats = calculateTemperatureStats();
//         chatbotResponseArea.innerHTML = `
//             <p>Highest Temperature: ${stats.highest}°C</p>
//             <p>Lowest Temperature: ${stats.lowest}°C</p>
//             <p>Average Temperature: ${stats.average}°C</p>
//         `;
//     }
// }

// // Intercept and process special queries before sending to Dialogflow
// function sendMessageToChatbot(userMessage) {
//     if (userMessage.includes('highest') || userMessage.includes('lowest') || userMessage.includes('average')) {
//         handleChatbotQueries(userMessage);
//     } else {
//         // Send the message to Dialogflow if not handled locally
//         const queryInput = {
//             queryInput: {
//                 text: {
//                     text: userMessage,
//                     languageCode: 'en'
//                 }
//             }
//         };

//         fetch(dialogflowAPIUrl, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(queryInput)
//         })
//         .then(response => response.json())
//         .then(responseData => displayChatbotResponse(responseData))
//         .catch(error => {
//             console.error('Error connecting to the Dialogflow API:', error);
//             chatbotResponseArea.innerHTML = `<p>Sorry, I couldn't process your request. Please try again later.</p>`;
//         });
//     }
// }
// DOM Elements
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatbotResponse = document.getElementById('chatbot-response');

// Set the API Key and URL for the Gemini Chatbot API
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCuZBNCAGVW-aXfNQPSKUl_UHhIkaNNN4k'; // Replace with actual API key

// Event listener for the send button
sendButton.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        await handleChatSubmit(userMessage);
    } else {
        chatbotResponse.innerHTML = '<p>Please enter a question!</p>';
    }
});

// Handle "Enter" key press for sending messages
chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            await handleChatSubmit(userMessage);
        }
    }
});

// Function to handle the chat submission
async function handleChatSubmit(chatInput) {
    try {
        // Show loading message while waiting for the response
        chatbotResponse.innerHTML += `<p><strong>You:</strong> ${chatInput}</p>`;
        chatbotResponse.innerHTML += `<p><em>Bot is typing...</em></p>`;

        // Make the HTTP POST request to the API endpoint
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{"parts": [{"text": chatInput}]}]
            }),
        });

        const data = await response.json();
        console.log('Response data:', data); // Log the entire response data

        // Check if response data contains candidates array
        if (data.hasOwnProperty('candidates') && Array.isArray(data.candidates) && data.candidates.length > 0) {
            // Extract chat response from the first candidate
            const firstCandidate = data.candidates[0];
            if (firstCandidate && firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts[0]) {
                const chatResponseData = firstCandidate.content.parts[0].text;
                // Display the response in the chat
                chatbotResponse.innerHTML += `<p><strong>Bot:</strong> ${chatResponseData}</p>`;
            } else {
                throw new Error('Invalid response data structure');
            }
        } else {
            throw new Error('Invalid response data structure');
        }
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        chatbotResponse.innerHTML += `<p><strong>Bot:</strong> Sorry, something went wrong. Please try again.</p>`;
    }

    // Clear input field and remove "typing" message
    chatInput.value = '';
    chatbotResponse.innerHTML = chatbotResponse.innerHTML.replace('<p><em>Bot is typing...</em></p>', '');
    
    // Scroll to the latest message
    chatbotResponse.scrollTop = chatbotResponse.scrollHeight;
}

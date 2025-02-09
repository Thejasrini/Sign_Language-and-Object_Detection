// Get DOM elements
const status = document.getElementById('status');
const startButton = document.getElementById('startButton');

// Initialize Speech Recognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = true; // Keep listening until stopped
recognition.interimResults = false; // Do not show results while speaking

// Initialize Speech Synthesis (Text-to-Speech)
const synth = window.speechSynthesis;

// Flag to track if recognition is already active
let isListening = false;

// Function to start listening on click
function startVoiceAssistant() {
    if (isListening) {
        console.log("Recognition is already active.");
        return; // Don't start recognition if it's already active
    }

    isListening = true;
    status.innerText = 'Listening for your command...';
    speak('Hello, how can I assist you?');
    recognition.start();
}

// Function to process speech input
recognition.onresult = function(event) {
    const command = event.results[event.resultIndex][0].transcript.toLowerCase();
    status.innerText = `You said: ${command}`;
    processCommand(command);
};

// Function to process the command
function processCommand(command) {
    if (command.includes("help")) {
        speak("You can say 'What are the options?' to know what you can do, or say 'Go back' to return.");
    } else if (command.includes("what are the options")) {
        speak("You can navigate through different sections, access sign language tutorials, or request object detection. What would you like to choose?");
    } else if (command.includes("sign language")) {
        speak("Opening sign language resources.");
        // Navigate to the Sign Language page
        window.location.href = "D:\\sign_2\\sign.html";
    } else if (command.includes("object detection")) {
        speak("Activating object detection. Please enable webcam access.");
        // Navigate to the Object Detection page with query parameter
        window.location.href = "D:\\sign_2\\obj.html";
    } else if (command.includes("go back")) {
        speak("Going back to the main menu.");
        // Navigate back to the homepage or main menu
        window.location.href = "file:///D:/sign_2/home.html";
    } 
    else if (command.includes("start detection")) {
        speak("Starting object detection.");
        // Start the object detection function
        startDetection();
    } else if (command.includes("stop detection")) {
        speak("Stopping object detection.");
        // Stop the object detection function
        stopDetection();
    }else {
        speak("Sorry, I didn't understand that.");
    }
    
}

// Function to speak (Text-to-Speech)
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Add event listener to start voice assistant on button click
startButton.addEventListener('click', function() {
    console.log("Button clicked!");
    startVoiceAssistant();
});

// Handle errors (for debugging)
recognition.onerror = function(event) {
    console.error("Error occurred: ", event.error);
    status.innerText = "Sorry, there was an error. Please try again.";
    speak("Sorry, there was an error. Please try again.");
};

// Log when recognition starts
recognition.onstart = function() {
    console.log("Voice Recognition started.");
};

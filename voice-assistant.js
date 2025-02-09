
const status = document.getElementById('status');
const startButton = document.getElementById('startButton');


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = true; 
recognition.interimResults = false; 


const synth = window.speechSynthesis;


let isListening = false;


function startVoiceAssistant() {
    if (isListening) {
        console.log("Recognition is already active.");
        return; 
    }

    isListening = true;
    status.innerText = 'Listening for your command...';
    speak('Hello, how can I assist you?');
    recognition.start();
}

recognition.onresult = function(event) {
    const command = event.results[event.resultIndex][0].transcript.toLowerCase();
    status.innerText = `You said: ${command}`;
    processCommand(command);
};

function processCommand(command) {
    if (command.includes("help")) {
        speak("You can say 'What are the options?' to know what you can do, or say 'Go back' to return.");
    } else if (command.includes("what are the options")) {
        speak("You can navigate through different sections, access sign language tutorials, or request object detection. What would you like to choose?");
    } else if (command.includes("sign language")) {
        speak("Opening sign language resources.");
       
        window.location.href = "D:\\sign_2\\sign.html";
    } else if (command.includes("object detection")) {
        speak("Activating object detection. Please enable webcam access.");
       
        window.location.href = "D:\\sign_2\\obj.html";
    } else if (command.includes("go back")) {
        speak("Going back to the main menu.");
        
        window.location.href = "file:///D:/sign_2/home.html";
    } 
    else if (command.includes("start detection")) {
        speak("Starting object detection.");
        
        startDetection();
    } else if (command.includes("stop detection")) {
        speak("Stopping object detection.");
        
        stopDetection();
    }else {
        speak("Sorry, I didn't understand that.");
    }
    
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

startButton.addEventListener('click', function() {
    console.log("Button clicked!");
    startVoiceAssistant();
});

recognition.onerror = function(event) {
    console.error("Error occurred: ", event.error);
    status.innerText = "Sorry, there was an error. Please try again.";
    speak("Sorry, there was an error. Please try again.");
};


recognition.onstart = function() {
    console.log("Voice Recognition started.");
};

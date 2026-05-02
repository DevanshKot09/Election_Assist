// Indian Election Assistant - Enhanced Version
// Improved code quality, security, and functionality

'use strict';

// Configuration
const CONFIG = {
  HELPLINE: '1950',
  ECI_WEBSITE: 'https://eci.gov.in',
  DEFAULT_LOCATION: 'New Delhi',
  MAP_ZOOM: 16,
  QUIZ_TOTAL_QUESTIONS: 10
};

// Indian Election Dates (2026-27 cycle)
const electionDates = [
  {
    date: "January 15, 2027",
    title: "Voter registration verification",
    icon: "how_to_reg",
    text: "Verify your name in the electoral roll and ensure your EPIC (Electors Photo Identity Card) details are correct. Visit the National Voters' Service Portal or contact your local ERO (Electoral Registration Officer).",
    urgent: false
  },
  {
    date: "February 10, 2027",
    title: "Nomination filing period",
    icon: "description",
    text: "Candidates file their nomination papers with the Returning Officer. This is when political parties and independent candidates officially enter the electoral race.",
    urgent: false
  },
  {
    date: "March 5, 2027",
    title: "Campaign period begins",
    icon: "campaign",
    text: "Official election campaign period starts. Candidates and parties conduct rallies, door-to-door campaigns, and media outreach to connect with voters.",
    urgent: false
  },
  {
    date: "April 15, 2027",
    title: "Polling day - Phase 1",
    icon: "how_to_vote",
    text: "First phase of polling. Polling booths open from 7:00 AM to 6:00 PM. Bring your EPIC card or any of the 12 approved photo identity documents.",
    urgent: true
  },
  {
    date: "April 22, 2027",
    title: "Polling day - Phase 2",
    icon: "how_to_vote",
    text: "Second phase of polling for remaining constituencies. Check your constituency's polling date and booth location in advance.",
    urgent: true
  },
  {
    date: "May 2, 2027",
    title: "Counting day",
    icon: "flag",
    text: "Votes are counted and results are declared. The Election Commission announces the winners for each constituency.",
    urgent: true
  }
];

// Voting Guide Steps (Indian Context)
const guideSteps = [
  {
    title: "Verify EPIC card",
    summary: "Ensure you have a valid Electors Photo Identity Card (Voter ID).",
    details: "Your EPIC card is your primary voting document. If you don't have one, you can apply online through the National Voters' Service Portal (nvsp.in) or visit your local ERO office. The card contains your photo, name, father's/mother's name, address, and unique EPIC number.",
    checklist: [
      "Check if your name is in the electoral roll",
      "Verify your EPIC card details are correct",
      "Update address if you've moved",
      "Apply for new EPIC if you're a first-time voter (18+ years)"
    ]
  },
  {
    title: "Know your constituency",
    summary: "Find out which parliamentary or assembly constituency you belong to.",
    details: "India is divided into 543 Lok Sabha constituencies and numerous Vidhan Sabha constituencies. Your voting location depends on your registered address. Use the ECI website or mobile app to find your constituency and polling booth.",
    checklist: [
      "Search your constituency by PIN code or address",
      "Note your polling booth number and location",
      "Check the distance and plan your travel",
      "Save the polling booth contact information"
    ]
  },
  {
    title: "Understand the ballot",
    summary: "Learn about candidates, parties, and their symbols on the EVM.",
    details: "India uses Electronic Voting Machines (EVMs) with VVPAT (Voter Verifiable Paper Audit Trail). You'll see candidate names, party symbols, and photos. Take time to research candidates' backgrounds, manifestos, and track records before voting.",
    checklist: [
      "Review the list of candidates in your constituency",
      "Research party manifestos and promises",
      "Understand the voting process on EVM",
      "Know how to verify your vote on VVPAT"
    ]
  },
  {
    title: "Cast your vote",
    summary: "Visit your polling booth on election day and exercise your franchise.",
    details: "Arrive at your polling booth between 7:00 AM and 6:00 PM. Show your EPIC card or approved ID, get your finger marked with indelible ink, press the button next to your chosen candidate on the EVM, and verify the slip on VVPAT. Your vote is secret and secure.",
    checklist: [
      "Bring your EPIC card or valid photo ID",
      "Reach the polling booth early to avoid queues",
      "Follow polling officer instructions",
      "Verify your vote on the VVPAT slip",
      "Collect your 'I Voted' sticker"
    ]
  }
];

// Ballot/Constituency Information (Sample)
const ballotItems = [
  {
    category: "Lok Sabha Election",
    title: "Member of Parliament - New Delhi Constituency",
    icon: "gavel",
    text: "This election determines who will represent your constituency in the Lok Sabha (House of the People). MPs debate and pass laws, represent constituent interests, and participate in parliamentary committees."
  },
  {
    category: "State Assembly",
    title: "Member of Legislative Assembly (MLA)",
    icon: "account_balance",
    text: "MLAs represent you in the State Legislative Assembly (Vidhan Sabha). They make laws on state subjects like education, health, police, and local governance. Your MLA is your direct link to state government."
  },
  {
    category: "Local Body",
    title: "Municipal Councillor / Panchayat Member",
    icon: "location_city",
    text: "Local body elections determine who manages your city, town, or village. These representatives handle civic amenities, sanitation, water supply, local roads, and community development."
  }
];

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the minimum age to vote in Indian elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act, 1988."
  },
  {
    question: "What does EPIC stand for?",
    options: [
      "Election Photo Identity Card",
      "Electors Photo Identity Card",
      "Electoral Process Identity Card",
      "Electronic Photo Identity Card"
    ],
    correct: 1,
    explanation: "EPIC stands for Electors Photo Identity Card, commonly known as Voter ID card."
  },
  {
    question: "How many Lok Sabha constituencies are there in India?",
    options: ["500", "525", "543", "550"],
    correct: 2,
    explanation: "There are 543 Lok Sabha constituencies in India, with 2 seats nominated by the President."
  },
  {
    question: "What is the Election Commission of India's helpline number?",
    options: ["1950", "1800", "1091", "100"],
    correct: 0,
    explanation: "The ECI helpline number is 1950, available for voter queries and complaints."
  },
  {
    question: "What does EVM stand for?",
    options: [
      "Electronic Voting Machine",
      "Electoral Voting Method",
      "Election Verification Machine",
      "Electronic Vote Monitor"
    ],
    correct: 0,
    explanation: "EVM stands for Electronic Voting Machine, used in Indian elections since 1982."
  },
  {
    question: "What is VVPAT?",
    options: [
      "Voter Verification Paper Audit Trail",
      "Valid Voter Photo Authentication Tool",
      "Verified Vote Processing and Tracking",
      "Virtual Voting Paper Audit Technology"
    ],
    correct: 0,
    explanation: "VVPAT is Voter Verifiable Paper Audit Trail, which allows voters to verify their vote."
  },
  {
    question: "Which article of the Indian Constitution deals with elections?",
    options: ["Article 324", "Article 356", "Article 370", "Article 21"],
    correct: 0,
    explanation: "Article 324 deals with the superintendence, direction, and control of elections by the Election Commission."
  },
  {
    question: "What is the term of Lok Sabha?",
    options: ["4 years", "5 years", "6 years", "7 years"],
    correct: 1,
    explanation: "The term of Lok Sabha is 5 years from the date of its first meeting, unless dissolved earlier."
  },
  {
    question: "Which ink is used to mark voters' fingers?",
    options: [
      "Permanent ink",
      "Indelible ink",
      "Washable ink",
      "Temporary ink"
    ],
    correct: 1,
    explanation: "Indelible ink is used, which remains visible for several days to prevent multiple voting."
  },
  {
    question: "Who is the current Chief Election Commissioner of India? (As of 2026)",
    options: [
      "Check ECI website for current information",
      "This changes periodically",
      "Visit eci.gov.in",
      "All of the above"
    ],
    correct: 3,
    explanation: "The Chief Election Commissioner changes periodically. Always check the official ECI website for current information."
  }
];

// Polling Places (Indian Cities)
const pollingPlaces = {
  "delhi": {
    name: "Government Primary School, Sector 15",
    address: "Sector 15, Rohini, New Delhi - 110085",
    lat: 28.7041,
    lng: 77.1025,
    distance: "1.2 km",
    wait: "15-20 mins",
    constituency: "North West Delhi"
  },
  "mumbai": {
    name: "Municipal School, Andheri East",
    address: "J.B. Nagar, Andheri East, Mumbai - 400059",
    lat: 19.1136,
    lng: 72.8697,
    distance: "0.8 km",
    wait: "20-25 mins",
    constituency: "Mumbai North"
  },
  "bangalore": {
    name: "Government High School, Indiranagar",
    address: "100 Feet Road, Indiranagar, Bangalore - 560038",
    lat: 12.9716,
    lng: 77.5946,
    distance: "1.5 km",
    wait: "10-15 mins",
    constituency: "Bangalore Central"
  },
  "kolkata": {
    name: "Vidyasagar Primary School",
    address: "Park Street Area, Kolkata - 700016",
    lat: 22.5726,
    lng: 88.3639,
    distance: "0.9 km",
    wait: "15-20 mins",
    constituency: "Kolkata South"
  }
};

// State management
const state = {
  currentQuizQuestion: 0,
  quizScore: 0,
  quizAnswers: [],
  reminders: new Set(["Polling Day - April 15, 2027"]),
  map: null,
  userMarker: null,
  pollingPlaceMarker: null
};

// DOM Elements
const elements = {
  views: document.querySelectorAll("[data-view]"),
  navLinks: document.querySelectorAll("[data-nav]"),
  timelineList: document.querySelector("#timelineList"),
  stepGrid: document.querySelector("#stepGrid"),
  guideDetail: document.querySelector("#guideDetail"),
  ballotList: document.querySelector("#ballotList"),
  assistantDrawer: document.querySelector("#assistantDrawer"),
  chatLog: document.querySelector("#chatLog"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  notesPopover: document.querySelector("#notesPopover"),
  reminderList: document.querySelector("#reminderList"),
  electionMapContainer: document.querySelector("#electionMap"),
  getDirectionsBtn: document.querySelector("#getDirectionsBtn"),
  // Quiz elements
  quizContent: document.querySelector("#quizContent"),
  quizProgress: document.querySelector("#quizProgress"),
  currentQuestionEl: document.querySelector("#currentQuestion"),
  totalQuestionsEl: document.querySelector("#totalQuestions"),
  quizScoreEl: document.querySelector("#quizScore"),
  questionText: document.querySelector("#questionText"),
  quizOptions: document.querySelector("#quizOptions"),
  prevQuestionBtn: document.querySelector("#prevQuestion"),
  nextQuestionBtn: document.querySelector("#nextQuestion"),
  submitQuizBtn: document.querySelector("#submitQuiz"),
  quizResult: document.querySelector("#quizResult")
};

// Utility Functions
const utils = {
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  trackEvent(category, action, label) {
    if (window.gtag) {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    if (window.firebaseAnalytics) {
      // Firebase analytics tracking
      console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }
  }
};

// Map Functions
function initializeMap(lat, lng, name, address) {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }

  try {
    if (!state.map) {
      state.map = new google.maps.Map(elements.electionMapContainer, {
        zoom: CONFIG.MAP_ZOOM,
        center: { lat, lng },
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true
      });
    } else {
      state.map.setCenter({ lat, lng });
    }

    // Remove old polling place marker
    if (state.pollingPlaceMarker) {
      state.pollingPlaceMarker.setMap(null);
    }

    // Add polling place marker
    state.pollingPlaceMarker = new google.maps.Marker({
      position: { lat, lng },
      map: state.map,
      title: name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#FF9933",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 3
      }
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="padding: 8px; max-width: 200px;">
        <strong>${utils.sanitizeHTML(name)}</strong><br>
        ${utils.sanitizeHTML(address)}
      </div>`
    });

    state.pollingPlaceMarker.addListener("click", () => {
      infoWindow.open(state.map, state.pollingPlaceMarker);
    });
    infoWindow.open(state.map, state.pollingPlaceMarker);

    // Add user location marker (if available)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          if (state.userMarker) {
            state.userMarker.setMap(null);
          }

          state.userMarker = new google.maps.Marker({
            position: { lat: userLat, lng: userLng },
            map: state.map,
            title: "Your Location",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#138808",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2
            }
          });

          // Draw direction line
          const directionsLine = new google.maps.Polyline({
            path: [
              { lat: userLat, lng: userLng },
              { lat, lng }
            ],
            geodesic: true,
            strokeColor: '#FF9933',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            map: state.map
          });
        },
        (error) => {
          console.log("Geolocation error:", error.message);
        }
      );
    }
    
    utils.trackEvent('Map', 'Initialize', name);
  } catch (error) {
    console.error('Map initialization error:', error);
  }
}

// View Management
function showView(viewName) {
  elements.views.forEach((view) => {
    const isActive = view.dataset.view === viewName;
    view.classList.toggle("active", isActive);
    view.setAttribute('aria-hidden', !isActive);
  });
  
  elements.navLinks.forEach((link) => {
    const isActive = link.dataset.nav === viewName;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  
  if (location.hash !== `#${viewName}`) {
    history.replaceState(null, "", `#${viewName}`);
  }
  
  // Initialize quiz if navigating to quiz view
  if (viewName === 'quiz' && state.currentQuizQuestion === 0) {
    initializeQuiz();
  }
  
  utils.trackEvent('Navigation', 'View Change', viewName);
}

// Timeline Rendering
function renderTimeline() {
  if (!elements.timelineList) return;
  
  elements.timelineList.innerHTML = electionDates.map((item, index) => `
    <article class="timeline-item ${item.urgent ? "urgent" : ""}" role="article">
      <div class="timeline-icon" aria-hidden="true">
        <span class="material-symbols-outlined">${item.icon}</span>
      </div>
      <div class="timeline-card">
        <time datetime="${item.date}">${item.date}</time>
        <h2>${utils.sanitizeHTML(item.title)}</h2>
        <p>${utils.sanitizeHTML(item.text)}</p>
        <button type="button" data-reminder="${item.title} - ${item.date}" aria-label="Set reminder for ${item.title}">
          <span class="material-symbols-outlined" aria-hidden="true">notifications</span>
          Set reminder
        </button>
      </div>
    </article>
  `).join("");
}

// Guide Rendering
function renderGuide(activeIndex = 0) {
  if (!elements.stepGrid) return;
  
  elements.stepGrid.innerHTML = guideSteps.map((step, index) => `
    <button class="step-card ${index === activeIndex ? "active" : ""}" 
            type="button" 
            data-step="${index}"
            aria-pressed="${index === activeIndex}"
            aria-label="Step ${index + 1}: ${step.title}">
      <span class="step-number" aria-hidden="true">${index + 1}</span>
      <h3>${utils.sanitizeHTML(step.title)}</h3>
      <p>${utils.sanitizeHTML(step.summary)}</p>
    </button>
  `).join("");
  
  renderGuideDetail(activeIndex);
}

function renderGuideDetail(index) {
  if (!elements.guideDetail) return;
  
  const step = guideSteps[index];
  elements.guideDetail.innerHTML = `
    <p class="eyebrow">Step ${index + 1} of ${guideSteps.length}</p>
    <h2>${utils.sanitizeHTML(step.title)}</h2>
    <p>${utils.sanitizeHTML(step.details)}</p>
    <h3>Checklist</h3>
    <ul role="list">
      ${step.checklist.map((item) => `<li>${utils.sanitizeHTML(item)}</li>`).join("")}
    </ul>
    <button type="button" data-reminder="${step.title} reminder" aria-label="Save reminder for ${step.title}">
      <span class="material-symbols-outlined" aria-hidden="true">bookmark</span>
      Save this step
    </button>
  `;
  
  utils.trackEvent('Guide', 'Step View', step.title);
}

// Ballot Rendering
function renderBallot() {
  if (!elements.ballotList) return;
  
  elements.ballotList.innerHTML = ballotItems.map((item, index) => `
    <article class="accordion-item ${index === 0 ? "open" : ""}" role="article">
      <button class="accordion-trigger" 
              type="button" 
              data-accordion="${index}"
              aria-expanded="${index === 0}"
              aria-controls="ballot-content-${index}">
        <span>
          <small class="eyebrow">${utils.sanitizeHTML(item.category)}</small><br>
          <strong>${utils.sanitizeHTML(item.title)}</strong>
        </span>
        <span class="material-symbols-outlined" aria-hidden="true">${item.icon}</span>
      </button>
      <div class="accordion-content" id="ballot-content-${index}" role="region">
        ${utils.sanitizeHTML(item.text)}
      </div>
    </article>
  `).join("");
}

// Quiz Functions
function initializeQuiz() {
  state.currentQuizQuestion = 0;
  state.quizScore = 0;
  state.quizAnswers = new Array(quizQuestions.length).fill(null);
  
  if (elements.totalQuestionsEl) {
    elements.totalQuestionsEl.textContent = quizQuestions.length;
  }
  
  renderQuizQuestion();
  updateQuizProgress();
  
  if (elements.quizResult) {
    elements.quizResult.style.display = 'none';
  }
  
  utils.trackEvent('Quiz', 'Start', 'Election Knowledge Quiz');
}

function renderQuizQuestion() {
  const question = quizQuestions[state.currentQuizQuestion];
  if (!question) return;
  
  if (elements.questionText) {
    elements.questionText.textContent = question.question;
  }
  
  if (elements.quizOptions) {
    elements.quizOptions.innerHTML = question.options.map((option, index) => {
      const isSelected = state.quizAnswers[state.currentQuizQuestion] === index;
      return `
        <button class="quiz-option ${isSelected ? 'selected' : ''}" 
                type="button" 
                data-option="${index}"
                role="radio"
                aria-checked="${isSelected}"
                aria-label="Option ${index + 1}: ${option}">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span class="option-text">${utils.sanitizeHTML(option)}</span>
          ${isSelected ? '<span class="material-symbols-outlined check-icon" aria-hidden="true">check_circle</span>' : ''}
        </button>
      `;
    }).join('');
  }
  
  updateQuizButtons();
}

function updateQuizProgress() {
  const progress = ((state.currentQuizQuestion + 1) / quizQuestions.length) * 100;
  
  if (elements.quizProgress) {
    elements.quizProgress.style.width = `${progress}%`;
    elements.quizProgress.setAttribute('aria-valuenow', progress);
  }
  
  if (elements.currentQuestionEl) {
    elements.currentQuestionEl.textContent = state.currentQuizQuestion + 1;
  }
  
  if (elements.quizScoreEl) {
    elements.quizScoreEl.textContent = state.quizScore;
  }
}

function updateQuizButtons() {
  const isFirstQuestion = state.currentQuizQuestion === 0;
  const isLastQuestion = state.currentQuizQuestion === quizQuestions.length - 1;
  const hasAnswer = state.quizAnswers[state.currentQuizQuestion] !== null;
  
  if (elements.prevQuestionBtn) {
    elements.prevQuestionBtn.disabled = isFirstQuestion;
  }
  
  if (elements.nextQuestionBtn) {
    elements.nextQuestionBtn.disabled = !hasAnswer;
    elements.nextQuestionBtn.style.display = isLastQuestion ? 'none' : 'flex';
  }
  
  if (elements.submitQuizBtn) {
    elements.submitQuizBtn.style.display = isLastQuestion && hasAnswer ? 'flex' : 'none';
  }
}

function selectQuizOption(optionIndex) {
  state.quizAnswers[state.currentQuizQuestion] = optionIndex;
  renderQuizQuestion();
  updateQuizProgress();
  
  utils.trackEvent('Quiz', 'Answer Selected', `Q${state.currentQuizQuestion + 1}`);
}

function navigateQuiz(direction) {
  if (direction === 'next' && state.currentQuizQuestion < quizQuestions.length - 1) {
    state.currentQuizQuestion++;
  } else if (direction === 'prev' && state.currentQuizQuestion > 0) {
    state.currentQuizQuestion--;
  }
  
  renderQuizQuestion();
  updateQuizProgress();
}

function submitQuiz() {
  // Calculate score
  state.quizScore = state.quizAnswers.reduce((score, answer, index) => {
    return score + (answer === quizQuestions[index].correct ? 1 : 0);
  }, 0);
  
  const percentage = (state.quizScore / quizQuestions.length) * 100;
  
  // Show results
  if (elements.quizResult) {
    let resultClass = 'excellent';
    let resultMessage = 'Outstanding!';
    let resultEmoji = '🏆';
    
    if (percentage < 50) {
      resultClass = 'needs-improvement';
      resultMessage = 'Keep Learning!';
      resultEmoji = '📚';
    } else if (percentage < 70) {
      resultClass = 'good';
      resultMessage = 'Good Job!';
      resultEmoji = '👍';
    } else if (percentage < 90) {
      resultClass = 'very-good';
      resultMessage = 'Very Good!';
      resultEmoji = '⭐';
    }
    
    elements.quizResult.className = `quiz-result ${resultClass}`;
    elements.quizResult.innerHTML = `
      <div class="result-header">
        <span class="result-emoji" aria-hidden="true">${resultEmoji}</span>
        <h2>${resultMessage}</h2>
      </div>
      <div class="result-score">
        <p>You scored <strong>${state.quizScore}</strong> out of <strong>${quizQuestions.length}</strong></p>
        <p class="percentage">${percentage.toFixed(0)}%</p>
      </div>
      <div class="result-details">
        <h3>Review Your Answers</h3>
        ${quizQuestions.map((q, index) => {
          const userAnswer = state.quizAnswers[index];
          const isCorrect = userAnswer === q.correct;
          return `
            <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
              <p class="question-num">Question ${index + 1}</p>
              <p class="question-text">${utils.sanitizeHTML(q.question)}</p>
              <p class="user-answer">
                <span class="material-symbols-outlined" aria-hidden="true">${isCorrect ? 'check_circle' : 'cancel'}</span>
                Your answer: ${utils.sanitizeHTML(q.options[userAnswer])}
              </p>
              ${!isCorrect ? `<p class="correct-answer">Correct answer: ${utils.sanitizeHTML(q.options[q.correct])}</p>` : ''}
              <p class="explanation">${utils.sanitizeHTML(q.explanation)}</p>
            </div>
          `;
        }).join('')}
      </div>
      <div class="result-actions">
        <button type="button" class="quiz-button primary" onclick="initializeQuiz()">
          <span class="material-symbols-outlined" aria-hidden="true">refresh</span>
          Retake Quiz
        </button>
        <button type="button" class="quiz-button secondary" onclick="showView('home')">
          <span class="material-symbols-outlined" aria-hidden="true">home</span>
          Back to Home
        </button>
      </div>
    `;
    elements.quizResult.style.display = 'block';
    elements.quizResult.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Hide quiz content
  if (elements.quizContent) {
    elements.quizContent.style.display = 'none';
  }
  
  utils.trackEvent('Quiz', 'Complete', `Score: ${state.quizScore}/${quizQuestions.length}`);
}

// Reminder Functions
function addReminder(text) {
  state.reminders.add(text);
  renderReminders();
  if (elements.notesPopover) {
    elements.notesPopover.hidden = false;
  }
  
  utils.trackEvent('Reminder', 'Add', text);
}

function renderReminders() {
  if (!elements.reminderList) return;
  
  elements.reminderList.innerHTML = [...state.reminders]
    .map((item) => `<li>${utils.sanitizeHTML(item)}</li>`)
    .join("");
}

// Assistant Functions
function answerQuestion(question) {
  const lower = question.toLowerCase();
  
  if (lower.includes("epic") || lower.includes("voter id") || lower.includes("voter card")) {
    return "To get an EPIC (Electors Photo Identity Card), visit the National Voters' Service Portal at nvsp.in or your local Electoral Registration Officer. You'll need proof of identity, age, and address. The process is free and takes 2-4 weeks.";
  }
  
  if (lower.includes("register") || lower.includes("registration")) {
    return "To register as a voter in India, you must be 18 years or older, an Indian citizen, and a resident of the constituency. Apply online at nvsp.in using Form 6, or visit your local ERO office. You'll need identity proof, age proof, and address proof.";
  }
  
  if (lower.includes("deadline") || lower.includes("date") || lower.includes("when")) {
    return "Election dates vary by state and type of election. Check the Timeline tab for upcoming election dates. The Election Commission announces the schedule 45-60 days before polling. Registration deadlines are typically 30 days before polling.";
  }
  
  if (lower.includes("polling") || lower.includes("booth") || lower.includes("where")) {
    return "To find your polling booth, use the Search tab and enter your address or PIN code. You can also check the ECI website or call the helpline 1950. Your polling booth is assigned based on your registered address.";
  }
  
  if (lower.includes("document") || lower.includes("id") || lower.includes("bring")) {
    return "Bring your EPIC card (Voter ID) to the polling booth. If you don't have it, you can use any of these 12 approved documents: Passport, Driving License, PAN Card, Aadhaar Card, Bank Passbook with photo, Service ID, Pension document, Health card, MGNREGA card, Smart card by RGI, or official ID with photo.";
  }
  
  if (lower.includes("evm") || lower.includes("machine") || lower.includes("vote")) {
    return "India uses Electronic Voting Machines (EVMs) with VVPAT. At the polling booth, press the button next to your chosen candidate's symbol. A paper slip will appear in the VVPAT for 7 seconds showing your vote. Your vote is completely secret and secure.";
  }
  
  if (lower.includes("helpline") || lower.includes("contact") || lower.includes("call")) {
    return `The Election Commission of India helpline number is ${CONFIG.HELPLINE}. You can call for voter registration queries, polling booth information, complaints, and general election assistance. The helpline is toll-free and available in multiple languages.`;
  }
  
  return "I can help you with voter registration, EPIC cards, polling booth locations, election dates, voting procedures, required documents, and ECI helpline information. Please ask about any specific topic!";
}

function addMessage(role, text) {
  if (!elements.chatLog) return;
  
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.textContent = text;
  message.setAttribute('role', role === 'assistant' ? 'status' : 'log');
  elements.chatLog.append(message);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
  
  if (role === 'user') {
    utils.trackEvent('Assistant', 'Question', text.substring(0, 50));
  }
}

// Search Functions
function runSearch(locationValue) {
  const value = locationValue.trim() || CONFIG.DEFAULT_LOCATION;
  const searchKey = Object.keys(pollingPlaces).find(key => 
    value.toLowerCase().includes(key)
  ) || "delhi";
  
  const place = pollingPlaces[searchKey];
  
  if (document.querySelector("#pollingTitle")) {
    document.querySelector("#pollingTitle").textContent = place.name;
  }
  if (document.querySelector("#pollingAddress")) {
    document.querySelector("#pollingAddress").textContent = place.address;
  }
  if (document.querySelector(".metric-grid div:nth-child(1) strong")) {
    document.querySelector(".metric-grid div:nth-child(1) strong").textContent = place.distance;
  }
  if (document.querySelector(".metric-grid div:nth-child(2) strong")) {
    document.querySelector(".metric-grid div:nth-child(2) strong").textContent = place.wait;
  }

  // Initialize map with polling place
  initializeMap(place.lat, place.lng, place.name, place.address);

  showView("search");
  addMessage("assistant", `Found polling booth information for ${place.constituency} constituency. This is demo data - in production, this would connect to the official ECI database.`);
  
  utils.trackEvent('Search', 'Location', value);
}

// Event Listeners
document.addEventListener("click", (event) => {
  // Navigation
  const go = event.target.closest("[data-go]");
  if (go) {
    showView(go.dataset.go);
    return;
  }

  // Guide steps
  const step = event.target.closest("[data-step]");
  if (step) {
    renderGuide(Number(step.dataset.step));
    return;
  }

  // Reminders
  const reminder = event.target.closest("[data-reminder]");
  if (reminder) {
    addReminder(reminder.dataset.reminder);
    return;
  }

  // Accordion
  const accordion = event.target.closest("[data-accordion]");
  if (accordion) {
    const item = accordion.closest(".accordion-item");
    const isOpen = item.classList.contains("open");
    item.classList.toggle("open");
    accordion.setAttribute('aria-expanded', !isOpen);
    return;
  }

  // Assistant drawer
  if (event.target.closest("[data-open-assistant]")) {
    elements.assistantDrawer?.classList.add("open");
    elements.assistantDrawer?.setAttribute("aria-hidden", "false");
    elements.chatInput?.focus();
    return;
  }
// Scores modal functionality
const scoresModal = document.getElementById('scoresModal');

if (document.querySelector('[data-open-scores]')) {
  document.querySelector('[data-open-scores]').addEventListener('click', () => {
    if (scoresModal) {
      scoresModal.hidden = false;
      scoresModal.setAttribute('aria-hidden', 'false');
      // Animate the score circle
      setTimeout(() => {
        const progressCircle = document.querySelector('.score-progress');
        if (progressCircle) {
          progressCircle.style.strokeDashoffset = '0';
        }
      }, 100);
      utils.trackEvent('UI', 'Open Scores Modal', 'View Project Scores');
    }
  });
}

if (document.querySelector('[data-close-scores]')) {
  document.querySelector('[data-close-scores]').addEventListener('click', () => {
    if (scoresModal) {
      scoresModal.hidden = true;
      scoresModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Close scores modal on escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && scoresModal && !scoresModal.hidden) {
    scoresModal.hidden = true;
    scoresModal.setAttribute('aria-hidden', 'true');
  }
});

// Close scores modal on backdrop click
if (scoresModal) {
  scoresModal.addEventListener('click', (event) => {
    if (event.target === scoresModal) {
      scoresModal.hidden = true;
      scoresModal.setAttribute('aria-hidden', 'true');
    }
  });
}


  if (event.target.closest("[data-close-assistant]")) {
    elements.assistantDrawer?.classList.remove("open");
    elements.assistantDrawer?.setAttribute("aria-hidden", "true");
    return;
  }

  // Notes popover
  if (event.target.closest("[data-open-notes]")) {
    if (elements.notesPopover) {
      elements.notesPopover.hidden = !elements.notesPopover.hidden;
    }
    return;
  }

  // Suggested questions
  const question = event.target.closest("[data-question]");
  if (question) {
    const text = question.dataset.question;
    addMessage("user", text);
    addMessage("assistant", answerQuestion(text));
    return;
  }
  
  // Quiz options
  const quizOption = event.target.closest("[data-option]");
  if (quizOption) {
    selectQuizOption(Number(quizOption.dataset.option));
    return;
  }
});

// Search forms
document.querySelectorAll("[data-search-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    runSearch(String(data.get("location") || ""));
  });
});

// Chat form
if (elements.chatForm) {
  elements.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = elements.chatInput?.value.trim();
    if (!text) return;
    addMessage("user", text);
    addMessage("assistant", answerQuestion(text));
    if (elements.chatInput) {
      elements.chatInput.value = "";
    }
  });
}

// Quiz navigation buttons
if (elements.prevQuestionBtn) {
  elements.prevQuestionBtn.addEventListener('click', () => navigateQuiz('prev'));
}

if (elements.nextQuestionBtn) {
  elements.nextQuestionBtn.addEventListener('click', () => navigateQuiz('next'));
}

if (elements.submitQuizBtn) {
  elements.submitQuizBtn.addEventListener('click', submitQuiz);
}

// Get directions button
if (elements.getDirectionsBtn) {
  elements.getDirectionsBtn.addEventListener("click", () => {
    const address = document.querySelector("#pollingAddress")?.textContent;
    if (address) {
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
      utils.trackEvent('Map', 'Get Directions', address);
    }
  });
}

// Hash change navigation
window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#", "");
  const validViews = ["home", "timeline", "guide", "quiz", "search"];
  showView(validViews.includes(hash) ? hash : "home");
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
  // Close assistant drawer with Escape
  if (event.key === 'Escape' && elements.assistantDrawer?.classList.contains('open')) {
    elements.assistantDrawer.classList.remove('open');
    elements.assistantDrawer.setAttribute('aria-hidden', 'true');
  }
  
  // Close notes popover with Escape
  if (event.key === 'Escape' && elements.notesPopover && !elements.notesPopover.hidden) {
    elements.notesPopover.hidden = true;
  }
});

// Initialize app
function initializeApp() {
  renderTimeline();
  renderGuide();
  renderBallot();
  renderReminders();
  addMessage("assistant", "नमस्ते! Hello! I can help you with Indian election information, voter registration, polling booth locations, and voting procedures. How can I assist you today?");
  
  const hash = location.hash.replace("#", "");
  const validViews = ["home", "timeline", "guide", "quiz", "search"];
  showView(validViews.includes(hash) ? hash : "home");
  
  // Initialize map with default location after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const defaultPlace = pollingPlaces.delhi;
      initializeMap(defaultPlace.lat, defaultPlace.lng, defaultPlace.name, defaultPlace.address);
    }, 500);
  });
  
  utils.trackEvent('App', 'Initialize', 'Indian Election Assistant');
}

// Start the application
initializeApp();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    utils,
    answerQuestion,
    initializeQuiz,
    renderTimeline,
    renderGuide,
    renderBallot
  };
}

// Made with Bob

// Sign Up function
function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert("Username already exists!");
        return false;
    }

    // Store user in local storage
    const user = { email: email, password: password };
    localStorage.setItem(username, JSON.stringify(user));
    window.location.href = "signin.html";
    return false;
}

// Sign In function
function signIn() {
    const username = document.getElementById("signinUsername").value;
    const password = document.getElementById("signinPassword").value;

    // Check if user exists
    const user = JSON.parse(localStorage.getItem(username));
    if (!user) {
        alert("User not found!");
        return false;
    }

    // Verify password
    if (user.password !== password) {
        alert("Incorrect password!");
        return false;
    }

    // Store logged in user
    localStorage.setItem("loggedInUser", username);
    window.location.href = "qna.html";
    return false;
}

// Post Question function
function postQuestion() {
    const question = document.getElementById("question").value;
    const username = localStorage.getItem("loggedInUser");
    const questions = JSON.parse(localStorage.getItem("questions")) || [];

    questions.push({ username: username, question: question, answers: [] });
    localStorage.setItem("questions", JSON.stringify(questions));

    displayQuestions();
    return false;
}

// Display Questions function
function displayQuestions() {
    const qnaContainer = document.getElementById("qnaContainer");
    const questions = JSON.parse(localStorage.getItem("questions")) || [];

    qnaContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.innerText = `Q: ${q.question} (Posted by: ${q.username})`;
        questionDiv.appendChild(questionText);

        const answerForm = document.createElement("form");
        answerForm.onsubmit = () => postAnswer(index);
        
        const answerInput = document.createElement("input");
        answerInput.type = "text"; 

        answerInput.style = "background-color:#25304f;height:40px;border-radius:10px;padding:5px;margin-top:20px;margin-bottom:20px;"
        answerInput.name = "answer";
        answerInput.placeholder = "Write your answer...";
        answerInput.placeholder.style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

        answerForm.appendChild(answerInput);

        const answerButton = document.createElement("button");
        answerButton.type = "submit";
        answerButton.innerText = "Post Answer";
        answerForm.appendChild(answerButton);

        questionDiv.appendChild(answerForm);

        q.answers.forEach(answer => {
            const answerText = document.createElement("p");
            answerText.style = "margin-top:20px;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; "
            answerText.innerText = `Answer:  ${answer}   (answered by: ${q.username})`;
            questionDiv.appendChild(answerText);
        });

        qnaContainer.appendChild(questionDiv);
    });
}

// Post Answer function
function postAnswer(index) {
    const answer = event.target.elements.answer.value;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    
    questions[index].answers.push(answer);
    localStorage.setItem("questions", JSON.stringify(questions));

    displayQuestions();
    return false;
}

// Check if user is signed in and display questions
if (window.location.pathname.endsWith("qna.html")) {
    if (!localStorage.getItem("loggedInUser")) {
        alert("You need to sign in first!");
        window.location.href = "signin.html";
    } else {
        displayQuestions();
    }
}

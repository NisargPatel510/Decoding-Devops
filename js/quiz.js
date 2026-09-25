const questions = [
  {q:"Which tool primarily records and manages source-code history?", a:["Docker","Git","Kubernetes","Jenkins"], c:1, e:"Git is the distributed version control system used to track changes."},
  {q:"What is the main purpose of a Docker image?", a:["Store Git commits","Act as a template for containers","Manage Kubernetes nodes","Run Jenkins jobs"], c:1, e:"A Docker image is a packaged template from which containers are created."},
  {q:"Which Kubernetes object provides a stable network endpoint for Pods?", a:["Commit","Service","Dockerfile","Agent"], c:1, e:"A Kubernetes Service exposes a stable network endpoint for a set of Pods."},
  {q:"What is a Jenkinsfile used for?", a:["Storing Docker images","Defining a Jenkins Pipeline as code","Creating Git branches","Creating Kubernetes nodes"], c:1, e:"A Jenkinsfile stores pipeline definition as code alongside the project."},
  {q:"Which command stages all current changes in Git?", a:["git push","git add .","git pull","git clone"], c:1, e:"git add . stages the current changes for the next commit."},
  {q:"Which command builds a Docker image from the current directory?", a:["docker ps","docker build -t myapp .","docker stop myapp","docker logs myapp"], c:1, e:"docker build uses the Dockerfile and build context to create an image."},
  {q:"What is the smallest deployable unit in Kubernetes?", a:["Node","Cluster","Pod","Service"], c:2, e:"A Pod is Kubernetes' smallest deployable unit."},
  {q:"In a CI/CD workflow, Jenkins is mainly responsible for:", a:["Container orchestration","Version control","Automation of delivery steps","Serving static files"], c:2, e:"Jenkins automates pipeline stages such as build, test and deployment."},
  {q:"What does a Git branch provide?", a:["A separate line of development","A Docker registry","A Kubernetes cluster","A Jenkins plugin"], c:0, e:"Branches isolate lines of development so work can proceed safely."},
  {q:"Which sequence matches our Decoding DevOps workflow?", a:["Docker → GitHub → Jenkins → Kubernetes","GitHub → Jenkins → Docker → Kubernetes","Kubernetes → Docker → GitHub → Jenkins","Jenkins → GitHub → Kubernetes → Docker"], c:1, e:"Our project uses GitHub as source, Jenkins for automation, Docker for packaging and Kubernetes for deployment."}
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.querySelector("#quizQuestion");
const optionsEl = document.querySelector("#quizOptions");
const feedbackEl = document.querySelector("#quizFeedback");
const progressEl = document.querySelector("#quizProgress");
const scoreEl = document.querySelector("#quizScore");
const nextBtn = document.querySelector("#quizNext");

function renderQuestion() {
  const item = questions[current];
  answered = false;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? "Finish Quiz" : "Next Question →";

  item.a.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index, clicked) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = [...optionsEl.children];
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === item.c) b.classList.add("correct");
  });
  if (index === item.c) {
    score++;
    feedbackEl.textContent = `✓ Correct. ${item.e}`;
  } else {
    clicked.classList.add("wrong");
    feedbackEl.textContent = `✗ Not quite. ${item.e}`;
  }
  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (!answered) return;
  if (current === questions.length - 1) {
    questionEl.textContent = `Quiz complete — ${score}/${questions.length}`;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = score >= 8 ? "Strong understanding. Keep practicing with the command labs." : "Review the tool concepts and try again.";
    nextBtn.textContent = "Restart Quiz";
    current = -1;
    return;
  }
  current++;
  renderQuestion();
});

renderQuestion();

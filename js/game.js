// HTML 요소들을 변수에 할당
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-btn");
const skipBtn = document.getElementById("skip-btn");

// 게임 보드의 크기와 뱀의 크기 설정
const boardWidth = canvas.width;
const boardHeight = canvas.height;
const snakeSize = 20;

// 게임에 필요한 변수 선언
let snake; // 뱀의 몸통을 나타내는 배열
let food; // 먹이의 위치를 나타내는 객체
let direction; // 뱀의 이동 방향을 나타내는 객체
let gameInterval; // 게임 루프를 제어하는 setInterval의 반환 값

// 게임 초기화 함수
function init() {
  snake = [{ x: 100, y: 100 }]; // 뱀의 초기 위치 설정
  direction = { x: 0, y: 0 }; // 뱀의 초기 방향 설정 (정지 상태)
  placeFood(); // 먹이를 랜덤 위치에 배치
  if (gameInterval) clearInterval(gameInterval); // 기존 게임 루프가 있다면 제거
  gameInterval = setInterval(gameLoop, 100); // 게임 루프 시작 (0.1초마다 업데이트)
}

// 게임 루프 함수
function gameLoop() {
  update(); // 게임 상태 업데이트
  draw(); // 게임 상태 그리기
}

// 게임 상태 업데이트 함수
function update() {
  // 뱀의 머리 위치 업데이트
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head); // 새로운 머리를 뱀의 맨 앞에 추가

  // 먹이를 먹었는지 확인
  if (head.x === food.x && head.y === food.y) {
    placeFood(); // 먹이를 새로운 위치에 배치
  } else {
    snake.pop(); // 먹지 않았다면 꼬리를 제거
  }

  // 벽에 부딪히거나 자기 자신과 충돌했는지 확인
  if (
    head.x < 0 ||
    head.x >= boardWidth ||
    head.y < 0 ||
    head.y >= boardHeight ||
    snake.some(
      (segment, index) =>
        index !== 0 && segment.x === head.x && segment.y === head.y
    )
  ) {
    clearInterval(gameInterval); // 게임 루프 중지
    alert("게임 오버"); // 게임 오버 메시지 표시
    init(); // 게임 재시작
  }
}

// 게임 상태 그리기 함수
function draw() {
  ctx.clearRect(0, 0, boardWidth, boardHeight); // 캔버스 지우기

  ctx.fillStyle = "#4caf50"; // 뱀의 색상 설정
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize); // 뱀 그리기
  });

  ctx.fillStyle = "#ff0000"; // 먹이의 색상 설정
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize); // 먹이 그리기
}

// 먹이를 랜덤 위치에 배치하는 함수
function placeFood() {
  food = {
    x: Math.floor((Math.random() * boardWidth) / snakeSize) * snakeSize, // 보드 크기에 맞춰 랜덤 x 위치 설정
    y: Math.floor((Math.random() * boardHeight) / snakeSize) * snakeSize, // 보드 크기에 맞춰 랜덤 y 위치 설정
  };
}

// 방향 변경 함수 (키보드 이벤트 처리)
function changeDirection(event) {
  const key = event.keyCode;
  // 각 방향키에 따른 이동 방향 설정
  if (key === 37 && direction.x === 0) {
    // 왼쪽 화살표
    direction = { x: -snakeSize, y: 0 };
  } else if (key === 38 && direction.y === 0) {
    // 위쪽 화살표
    direction = { x: 0, y: -snakeSize };
  } else if (key === 39 && direction.x === 0) {
    // 오른쪽 화살표
    direction = { x: snakeSize, y: 0 };
  } else if (key === 40 && direction.y === 0) {
    // 아래쪽 화살표
    direction = { x: 0, y: snakeSize };
  }
}

// 이벤트 리스너 등록
document.addEventListener("keydown", changeDirection); // 방향키 이벤트
startBtn.addEventListener("click", init); // 시작 버튼 클릭 이벤트
skipBtn.addEventListener("click", () => (window.location.href = "home.html")); // 건너뛰기 버튼 클릭 이벤트

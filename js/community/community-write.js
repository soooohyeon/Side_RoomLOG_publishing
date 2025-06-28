// --------------------------------------------------------------- 

// 해시태그
let input = $("input[name='hashtag']");
const MAX_TAGS = 5;

// 해시태그 목록 (자동완성 용)
const tagNames = ["소파", "인테리어", "가죽소파", "디저트", "토스트", "치즈", "그릭요거트", "조명", "식탁", "커피", "라떼아트", "라떼"];

let tagify = new Tagify(input[0], {
  whitelist: tagNames,
  focusable: false,
  placeholder: '관련 키워드를 태그로 남겨보세요.',
  keepPlaceholder: true,
  maxTags: MAX_TAGS,
  dropdown: {
    position: "input",
    enabled: 0
  }
});


// placeholder 보이도록
function updatePlaceholderState() {
  const len = tagify.value.length;
  // 태그 입력창에 값 존재 여부 확인
  const hasText = tagify.DOM.input.textContent.trim() !== "";

  const placeholderText = len >= MAX_TAGS
    ? "최대 5개까지 입력 가능합니다."
    : "관련 키워드를 태그로 남겨보세요.";

  // 핵심 placeholder 문구 갱신
  tagify.DOM.input.setAttribute("data-placeholder", placeholderText);

  // placeholder 보이게 할지 말지 (css로 강제로 보이게 해뒀기 때문에 설정 필요)
  const showPlaceholder = !hasText;
  tagify.DOM.input.style.setProperty("--placeholder-visible", showPlaceholder ? "1" : "0");

  // contenteditable 유지
  tagify.DOM.input.setAttribute("contenteditable", true);
  tagify.DOM.input.style.pointerEvents = len >= MAX_TAGS ? "none" : "auto";

  // 태그 5개 이상일때도 placeholder` 보이도록 처리
  if (!hasText && len >= MAX_TAGS) {
    tagify.DOM.input.innerHTML = "";
  }
}

updatePlaceholderState();
tagify.on('add', updatePlaceholderState);
tagify.on('remove', updatePlaceholderState);

// 태그 클릭 시 placeholder 복구
tagify.DOM.scope.addEventListener("click", () => {
  setTimeout(updatePlaceholderState, 0);
});

// 외부 클릭 시 placeholder 복구
document.addEventListener("click", () => {
  setTimeout(updatePlaceholderState, 0);
});

// 외부 클릭 + blur 시에도 placeholder 보이도록
tagify.DOM.input.addEventListener("blur", () => {
  setTimeout(updatePlaceholderState, 0);
});

// Backspace로 태그 삭제 막기
tagify.DOM.input.addEventListener("keydown", function (e) {
  if (e.key === "Backspace" && tagify.DOM.input.textContent.trim() === "") {
    e.preventDefault();
    e.stopImmediatePropagation(); // Tagify 내부 로직까지 차단
  }
}, true); // 캡쳐 단계에서 감지시켜 Tagify 로직보다 먼저 작동하도록 설정

// --------------------------------------------------------------- 

// 제목, 본문 유효성 검사
// 회원가입 유효성 검사
let isCheckTitle = false;
let isCheckContent = false;

// 제목 값 확인
$("input[name='title']").on("input keyup", function() {
  isCheckTitle = $(this).val() == "" ? false : true;
  writeButton();
});
// 본문 값 확인
$("textarea[name='content']").on("input keyup", function() {
  isCheckContent = $(this).val() == "" ? false : true;
  writeButton();
  isFormFilled()
});

function writeButton() {
  const $btn = $("#WRITE-BTN");
  if (isCheckTitle && isCheckContent) {
    $btn
      .addClass("basic-button")
      .removeClass("disabled");
  } else {
    $btn
      .removeClass("basic-button")
      .addClass("disabled");
  } 
}

// --------------------------------------------------------------- 

const writePostMsg = "이대로 글을 작성할까요?";

// 글 등록 버튼 클릭 시
$(document).on("click", ".basic-button", function() {
  openModal(writePostMsg, 2).then((result) => {
    if (result) {
      location.href="";
    }
  });
});

// --------------------------------------------------------------- 

// 값이 입력된 상태일 때 뒤로가기나 페이지 이동 클릭 시 모달 띄우기
let isBlocking = false;   // 뒤로가기 막을지에 대한 여부
let hasPushed = false;    // 뒤로가기 눌렀는지에 대한 여부
let isModalOpen = false;  // 중복 모달 방지를 위한 flag 변수
const moveMsg = "작성 중인 내용이 저장되지 않습니다.<br>정말 이동하시겠습니까?";

// 입력된 값이 있는지 확인
function isFormFilled() {
  const title = $("input[name='title']").val().trim();
  const content = $("textarea[name='content']").val().trim();
  const file = $("input[name='images']")[0]?.files.length > 0;
  const tags = tagify?.value?.length > 0;
  return title !== "" || content !== "" || file || tags;
}

// 뒤로가기 눌렀을 때
function updateBackBlock() {
  const filled = isFormFilled();

  // 값이 채워졌을 때 
  if (filled && !hasPushed) {
    history.pushState({ preventBack: true }, "", location.href);
    hasPushed = true;
    isBlocking = true;
  }

  // 값이 비워졌을 때
  if (!filled && hasPushed) {
    history.back();
    hasPushed = false;
    isBlocking = false;
  }
}

// 값을 입력 후 다시 지웠을 때 히스토리 복구하기 위함
$(document).ready(function () {
  $("input, textarea").on("input", updateBackBlock);
  $("input[name='images']").on("change", updateBackBlock);
  tagify.on("change", updateBackBlock);
});

// 페이지 이동 시
$(document).on("click", "a, button, [data-navigate]", function (e) {
  const href = $(this).attr("href") || $(this).data("href");

  if (href && isFormFilled()) {
    e.preventDefault(); // 기본 이동 막음
    openModal(moveMsg, 2).then((result) => {
      if (result) {
        isBlocking = false;
        hasPushed = false;
        location.href = href;
      }
    });
  }
});

// 뒤로가기 눌렀을 때
window.addEventListener("popstate", function (e) {

  if (isBlocking && isFormFilled() && !isModalOpen) {
    isModalOpen = true;
    openModal(moveMsg, 2).then((result) => {
      if (result) {
        isBlocking = false;
        hasPushed = false;
        history.back();
      } else {
        history.pushState({ preventBack: true }, "", location.href);
      }
      isModalOpen = false;
    });
  }
});

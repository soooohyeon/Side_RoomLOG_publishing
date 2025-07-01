$(document).ready(function() {
  // 새 댓글
  const $message = $("#TEXTAREA-MESSAGE");
  
  // 로그아웃 상태면 textarea 비활성화
  $message.on("focus", function (e) {
    // openModal("로그인 후 이용해 주세요.");
    // $textarea.blur(); // 포커스 다시 제거
  });
  // 실시간 글자 수 표시, 등록 버튼 활성화
  $message.on("change input", countMessage);

  // 댓글 수정 취소 함수 호출
  updateCancel();

});

// --------------------------------------------

// 새 댓글 작성 시 - 실시간 글자 수 표시, 등록 버튼 활성화
function countMessage() {
  const $messageCount = $("#SPAN-COUNT");

  // 이모지 포함 정확한 길이 계산
  let content = $(this).val();
  let trimmed = Array.from(content).slice(0, 300).join("");

  // 200자까지만 입력
  if (content !== trimmed) {
    $(this).val(trimmed);
    content = trimmed;
  }

  const nowLength = Array.from(content).length;
  const sendBtn = $("#WRITE-BTN");

  // 글자수 표시
  $messageCount.text(nowLength);
  
  // 1자 이상 입력 시 클래스 부여
  if (nowLength > 0) {
    sendBtn.attr("class", "button-style basic-button");
  } else {
    sendBtn.attr("class", "button-style disabled");
  }
}

// --------------------------------------------

// 메세지 보내기 버튼 클릭 시
$(document).on("click", ".basic-button", function() {
  const user = "반쯤열린창";
  const sendMsg = `메시지가 전송되었습니다.<br>${user} 님의 답장을 기다려보세요.`;
  openModal(sendMsg);
});

// --------------------------------------------------------------- 

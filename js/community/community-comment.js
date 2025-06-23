// ---------------------------------------------------------------
// 댓글

// 답글 버튼 호버시
const $reCommentBtn = $(".div-re-comment-btn");

$reCommentBtn.hover(function () {
  const $img = $(this).children("img");
  const src = $img.attr("src");
  
  // hover 이미지로 바꾸기
  if (src.includes("re_comment_btn.png")) {
    $img.attr("src", "../../image/community/re_comment_btn_hover.png");
  }
}, function () {
  const $img = $(this).children("img");
  const src = $img.attr("src");

  // hover에서 벗어날 때 다시 원래 이미지로 복귀
  if (src.includes("re_comment_btn_hover.png")) {
    $img.attr("src", "../../image/community/re_comment_btn.png");
  }
});

// ---------------------------------------------------------------

$(document).ready(function(){
  // 새 댓글
  const $comment = $("#TEXTAREA-COMMENT-TXT");
  
  // 로그아웃 상태면 textarea 비활성화
  $comment.on("focus", function (e) {
    // openModal("로그인 후 이용해 주세요.");
    // $textarea.blur(); // 포커스 다시 제거
  });
  // 실시간 글자 수 표시, 등록 버튼 활성화
  $comment.on("change input", countComent);
});

// 새 댓글 작성 시 - 실시간 글자 수 표시, 등록 버튼 활성화
function countComent() {
  const $commentCount = $("#SPAN-COMMENT-COUNT");

  // 이모지 포함 정확한 길이 계산
  let content = $(this).val();
  let trimmed = Array.from(content).slice(0, 200).join("");

  // 200자까지만 입력
  if (content !== trimmed) {
    $(this).val(trimmed);
    content = trimmed;
  }

  const nowLength = Array.from(content).length;
  const saveBtn = $(this).next().find("button");
  // 글자수 표시
  $commentCount.text(nowLength);
  
  // 1자 이상 입력 시 클래스 부여
  if (nowLength > 0) {
    saveBtn.addClass("btn-actice");
    saveBtn.prop("disabled", false);
    saveBtn.attr("type", "submit");
  } else {
    saveBtn.removeClass("btn-actice");
    saveBtn.prop("disabled", true);
  }
}

// ---------------------------------------------------------------

// 현재 열린 댓글 폼이 있는지 확인
let reCommentCheck = false;

// 답글 버튼 클릭 시 입력 폼 생성
$(".div-re-comment-btn").on("click", function (){
  // 누른 답글 버튼의 댓글을 감싸는 마지막 div
  $divWrap = $(this).closest(".div-parent-comment");
  // 대댓글 입력 폼
  const reCommentForm = `<div class="div-comment-wrap div-re-comment-write-wrap">
                          <form action="">
                            <div class="div-re-comment-write">
                              <textarea name="re-comment" id="TEXTAREA-RE-COMMENT-TXT" placeholder="댓글에 답글을 남겨보세요."></textarea>
                            </div>
                            <div class="div-comment-btn-wrap textarea-btn-wrap">
                                <div class="div-comment-btn div-menu-line"><span id="RE-COMMENT-WRITE-BTN">등록</span></div>
                                <div class="div-comment-btn"><span id="RE-COMMENT-CANCEL-BTN">취소</span></div>
                            </div>
                          </form>
                        </div>`;

  // 다른 입력 폼이 있을 경우 삭제
  if (reCommentCheck) {
    openModal("작성 중인 댓글은 저장되지 않습니다.<br>정말 취소할까요?", 2).then((result) => {
      if (result) {
        $(".div-re-comment-write-wrap").remove();
        $divWrap.after(reCommentForm);
      }
    });
  } else {
    $divWrap.after(reCommentForm);
    reCommentCheck = true;
  }
});


// 취소 버튼 클릭시 입력 폼 삭제
$(document).on("click", "#RE-COMMENT-CANCEL-BTN", function () {
  const recommentCount = $(this).closest("form").find("textarea").val().length;
  if (recommentCount > 0) {
    openModal("작성 중인 댓글은 저장되지 않습니다.<br>정말 취소할까요?", 2).then((result) => {
      if (result) {
        console.log(result);
        $(this).closest(".div-re-comment-write-wrap").remove();
        reCommentCheck = false;
      }
    });
    
  } else {
    $(this).closest(".div-re-comment-write-wrap").remove();
    reCommentCheck = false;
  }
});

// ---------------------------------------------------------------

// 200자 제한, 내용 존재 여부 검사
function isValidComment($textarea, maxLength = 200) {
  let comment = $textarea.val();
  const trimmed = Array.from(comment).slice(0, maxLength).join("");
  
  if (comment !== trimmed) {
    $textarea.val(trimmed);
    comment = trimmed;
  }
  
  return Array.from(comment).length > 0;
}

// 대댓글 작성 버튼 클릭 시 
$(document).on("click", "#RE-COMMENT-WRITE-BTN", function () {
  const $reComment = $(this).closest("form").find("#TEXTAREA-RE-COMMENT-TXT");
  const result = isValidComment($reComment);

  if (result) {
    console.log("댓글 저장");
  } else {
    openModal("댓글 내용을 입력해 주세요.");
  }
});

// 댓글 수정 버튼 클릭 시
$(document).on("click", "#COMMENT-UPDATE-BTN", function () {
  const $commentEdit = $(this).closest(".div-comment-update-wrap").find("#TEXTAREA-RE-COMMENT-TXT");
  const result = isValidComment($commentEdit);

  if (result) {
    console.log("댓글 수정");
  } else {
    openModal("댓글 내용을 입력해 주세요.");
  }
});

// ---------------------------------------------------------------

// 댓글 수정 버튼 클릭 시
$(document).on("click", ".comment-update-btn", function () {
  $oriCommentWrap = $(this).closest(".div-comment-content-wrap");
  $oriComment = $oriCommentWrap.find(".div-comment-content");
  const oriText = $oriComment.text().trim();
  

  const editBox = `
            <div class="div-comment-update-wrap">
              <div class="div-comment-update">
                <textarea name="re-comment" id="TEXTAREA-RE-COMMENT-TXT">` + oriText + `</textarea>
              </div>
              <div class="div-comment-btn-wrap textarea-btn-wrap">
                  <div class="div-comment-btn div-menu-line"><span id="COMMENT-UPDATE-BTN">등록</span></div>
                  <div class="div-comment-btn"><span id="COMMENT-UPDATE-CANCEL-BTN">취소</span></div>
              </div>
            </div>
  `;
  
  $oriCommentWrap.html(editBox);
});


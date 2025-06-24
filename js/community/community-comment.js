// ---------------------------------------------------------------
// 댓글

// 답글 버튼 호버시
const $reCommentBtn = $(".div-re-comment-btn");

$reCommentBtn.hover(function() {
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

$(document).ready(function() {
  // 새 댓글
  const $comment = $("#TEXTAREA-COMMENT-TXT");
  
  // 로그아웃 상태면 textarea 비활성화
  $comment.on("focus", function (e) {
    // openModal("로그인 후 이용해 주세요.");
    // $textarea.blur(); // 포커스 다시 제거
  });
  // 실시간 글자 수 표시, 등록 버튼 활성화
  $comment.on("change input", countComent);

  // 댓글 수정 취소 함수 호출
  updateCancel();
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
$(".div-re-comment-btn").on("click", function() {
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
$(document).on("click", "#RE-COMMENT-CANCEL-BTN", function() {
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
$(document).on("click", "#RE-COMMENT-WRITE-BTN", function() {
  const $reComment = $(this).closest("form").find("#TEXTAREA-RE-COMMENT-TXT");
  const result = isValidComment($reComment);

  if (result) {
    console.log("댓글 저장");
  } else {
    openModal("댓글 내용을 입력해 주세요.");
  }
});

// 댓글 수정 버튼 클릭 시
$(document).on("click", "#COMMENT-UPDATE-BTN", function() {
  const $commentEdit = $(this).closest(".div-comment-update-wrap").find("#TEXTAREA-RE-COMMENT-TXT");
  const result = isValidComment($commentEdit);

  if (result) {
    console.log("댓글 수정");
  } else {
    openModal("댓글 내용을 입력해 주세요.");
  }
});

// ---------------------------------------------------------------

// 현재 댓글 수정 폼이 있는지 확인
let $currentEditComment = null;
// 댓글 수정 버튼 클릭 시
$(document).on("click", ".comment-update-btn", function() {
  $oriCommentWrap = $(this).closest(".div-comment-content-wrap");
  $oriComment = $oriCommentWrap.find(".div-comment-content");

  const oriCommentText = $oriComment.text().trim();
  const editFrame = `
            <div class="div-comment-update-wrap">
              <div class="div-comment-update">
                <textarea name="re-comment" id="TEXTAREA-RE-COMMENT-TXT">` + oriCommentText + `</textarea>
              </div>
              <div class="div-comment-btn-wrap textarea-btn-wrap">
                  <div class="div-comment-btn div-menu-line"><span id="COMMENT-UPDATE-BTN">등록</span></div>
                  <div class="div-comment-btn"><span id="COMMENT-UPDATE-CANCEL-BTN">취소</span></div>
              </div>
            </div>
  `;

  // 이미 수정 중인 댓글이 있다면
  // 최근 수정 중인 댓글에 담긴 값이 있거나 현재 누른 댓글과 일치하지 않는다면면
  if ($currentEditComment && !$oriCommentWrap.is($currentEditComment)) {
    console.log("22");
    openModal("이미 다른 댓글을 수정 중입니다.<br>현재 수정을 취소하고 이 댓글을 수정하시겠어요?", 2).then((result) => {
      if (result) {
        console.log(result);
        const oriComment = $currentEditComment.data("original-text");
        const className = $currentEditComment.attr("class");
        
        // 클래스명으로 댓글, 대댓글 구분
        if (className.includes("parent-comment-wrap")) {
          // 댓글
          renderOriginalComment($currentEditComment, oriComment, "comment");
        } else if (className.includes("child-comment-wrap")) {
          // 대댓글
          renderOriginalComment($currentEditComment, oriComment, "reComment");
        }
        // 속성에 원본 댓글 넣기
        $oriCommentWrap.data("original-text", oriCommentText);
        // 수정 폼으로 변경
        $oriCommentWrap.html(editFrame);
        // 최근 수정한 댓글 담아두기
        $currentEditComment = $oriCommentWrap;
      }
    });
  } else {
    // 속성에 원본 댓글 넣기
    $oriCommentWrap.data("original-text", oriCommentText);
    // 수정 폼으로 변경
    $oriCommentWrap.html(editFrame);
    // 최근 수정한 댓글 담아두기
    $currentEditComment = $oriCommentWrap;
  }

});

// 댓글 수정 취소
function updateCancel() {
  $(document).on("click", "#COMMENT-UPDATE-CANCEL-BTN", function (){
    const $wrap = $(this).closest(".div-comment-content-wrap");
    const className = $wrap.attr("class");
    const oriComment = $wrap.data('original-text');
    
    // 클래스명으로 댓글, 대댓글 구분
    if (className.includes("parent-comment-wrap")) {
      // 댓글
      renderOriginalComment($wrap, oriComment, "comment");
    } else if (className.includes("child-comment-wrap")) {
      // 대댓글
      renderOriginalComment($wrap, oriComment, "reComment");
    }
  });
}

// 수정 취소한 댓글 화면에 다시 뿌리기
function renderOriginalComment(wrap, oriText, type) {
  // 공통 DOM 부분
  let oriSameStart = `
    <div class="div-re-comment-btn-wrap">
    <div class="div-comment-content">
      ${oriText}
    </div>
  `;
  let oriSameLast = `
    <div class="div-comment-btn-wrap">
      <div class="div-comment-btn div-menu-line"><span class="comment-update-btn">수정</span></div>
      <div class="div-comment-btn"><span>삭제</span></div>
    </div>
  `;
  // 댓글, 대댓글에 따라 다른 DOM 부분
  let oriOther = "";

  if (type === "comment") {
    oriOther = `
        <div class="div-re-comment-btn">
          <img src="../../image/community/re_comment_btn.png">답글
        </div>
      </div>
    `;
  } else if (type === "reComment") {
    oriOther = `</div>`;
  }

  // 화면에 뿌리기
  wrap.html(`${oriSameStart}${oriOther}${oriSameLast}`);
  // 현재 댓글 수정 폼 변수 초기화
  $currentEditComment = null;
}

// 댓글 삭제 버튼 클릭 시
$(".comment-delete-btn").on("click", function() {
  console.log("이게 바로 click이다 이거야");

  const $wrap = $(this).closest(".div-comment-content-wrap");
  const className = $wrap.attr("class");
  const oriComment = $wrap.data('original-text');
  
  // 클래스명으로 댓글, 대댓글 구분
  if (className.includes("parent-comment-wrap")) {
    // 댓글
    openModal("이 댓글을 정말 지우시겠어요?<br>한 번 삭제하면, 다시 볼 수 없어요.", 2).then((result) => {
      if (result) {
        location.href = "삭제경로";
      }
    });
  } else if (className.includes("child-comment-wrap")) {
    // 대댓글
    openModal("이 답글을 정말 지우시겠어요?<br>삭제하면 복구가 불가능해요.", 2).then((result) => {
      if (result) {
        location.href = "삭제경로";
      }
    });
  }
});
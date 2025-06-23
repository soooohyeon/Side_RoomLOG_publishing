// 이미지 관련
// 메인 이미지 - 높이 자동 조절
function setBoxHeight() {
  const $box = $("#DIV-MAIN-IMAGE");
  const width = $box.outerWidth();
  $box.css("height", width * 0.7 + "px");
}
// 메인 이미지 - 로딩 + 리사이즈 이벤트에 적용
$(window).on("load resize", setBoxHeight);

// 이미지 리스트 - 높이 자동 조절
function setMiniBoxHeight() {
  const $box = $(".div-sub-image");
  const width = $box.outerWidth();
  $box.css("height", width * 0.8 + "px");
}
// 이미지 리스트 - 로딩 + 리사이즈 이벤트에 적용
$(window).on("load resize", setMiniBoxHeight);

// 메인 이미지 띄우기
function changeImage(element) {
  const newSrc = $(element).attr("src");
  const $mainImage = $("#DIV-MAIN-IMAGE img");

  $mainImage.fadeOut(100, function () {
    $mainImage.attr("src", newSrc).fadeIn(150);
  });
}

// ---------------------------------------------------------------

// 스크랩
// 스크랩이 아닌 상태에서 버튼 호버시
$('.blue-line-button').hover(function () {
  const $img = $(this).children("img");
  const src = $img.attr("src");

  // 현재 이미지가 스크랩된 상태일 때만 hover 이미지로 바꾸기
  if (src.includes("scrap_ok.png")) {
    $img.attr("src", "../../image/community/scrap_hover.png");
  }
}, function () {
  const $img = $(this).children("img");
  const src = $img.attr("src");

  // hover에서 벗어날 때 다시 원래 이미지로 복귀
  if (src.includes("scrap_hover.png")) {
    $img.attr("src", "../../image/layout/scrap_ok.png");
  }
});

// 스크랩 하기
function goPostScrap(element) {
  element.setAttribute("class", "button-style basic-button");
  element.setAttribute("onclick", "noPostScrap(this)");
  element.children[0].src = "../../image/community/scrap_white.png";
}

// 스크랩 해제
function noPostScrap(element) {
  element.setAttribute("class", "button-style blue-line-button");
  element.setAttribute("onclick", "goPostScrap(this)");
  element.children[0].src = "../../image/layout/scrap_ok.png";
}

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


$(document).ready(function(){
  const $comment = $("#TEXTAREA-COMMENT-TXT");
  // const $reComment = $("#TEXTAREA-RE-COMMENT-TXT");
  
  // 로그아웃 상태면 textarea 비활성화
  $comment.on("focus", function (e) {
    openModal("로그인 후 이용해 주세요.");
    $textarea.blur(); // 포커스 다시 제거
  });

  // 로그인 상태
  // 새 댓글 작성시 - 실시간 글자 수 표시, 등록 버튼 활성화
  $comment.on("keyup input", countComent);

  // 로그인 상태
  // 대댓글 작성 + 댓글 수정시 글자 수 체크
  // $reComment.on("keyup input", countReComent);

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

// 현재 열린 댓글 폼이 있는지 확인인
let reCommentCheck = false;

// 답글 버튼 클릭 시 입력 폼 생성
$(".div-re-comment-btn").on("click", function (){
  console.log("답글 버튼 클릭");
  // 누른 답글 버튼의 댓글을 감싸는 마지막 div
  $divWrap = $(this).closest(".div-parent-comment");
  // 대댓글 입력 폼
  const reCommentForm = `<div class="div-comment-wrap div-re-comment-write-wrap">
                          <form action="">
                            <div class="div-re-comment-write">
                              <textarea name="re-comment" id="TEXTAREA-RE-COMMENT-TXT" placeholder="댓글에 답글을 남겨보세요."></textarea>
                            </div>
                            <div class="div-comment-btn-wrap">
                                <div class="div-comment-btn div-menu-line"><span id="RE-COMMENT-WRITE-BTN">등록</span></div>
                                <div class="div-comment-btn"><span id="RE-COMMENT-CANCEL-BTN">취소</span></div>
                            </div>
                          </form>
                        </div>`;

  // 다른 입력 폼이 있을 경우 삭제
  if (reCommentCheck) {
    $(".div-re-comment-write-wrap").remove();
    openModal("댓글 내용을 입력해 주세요.");
  }
  $divWrap.after(reCommentForm);
  reCommentCheck = true;
});

// 취소 버튼 클릭시 입력 폼 삭제
$(document).on("click", "#RE-COMMENT-CANCEL-BTN", function () {
  $(this).closest(".div-re-comment-write-wrap").remove();
});

// 대댓글 작성 버튼 클릭 시 - 200자 제한, 내용 유효성 검사
$(document).on("click", "#RE-COMMENT-WRITE-BTN", function () {
  const $reComment = $(this).closest("form").find("#TEXTAREA-RE-COMMENT-TXT").val();
  let trimmed = Array.from($reComment).slice(0, 200).join("");
  
  // 200자까지만 입력
  if ($reComment !== trimmed) {
    $(this).val(trimmed);
    $reComment = trimmed;
  }

  const nowLength = Array.from($reComment).length;
  
  // 1자 이상 입력 시
  if (nowLength > 0) {
    console.log("댓글 저장");
  } else {
    openModal("댓글 내용을 입력해 주세요.");
  }
});
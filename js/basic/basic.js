// 공통 이벤트
// ---------------------------------------------------------------

// 메세지함 버튼 클릭 시
$("#GO-MESSAGE-PAGE").on("click", function() {
  const userNumber = 0;

  if (userNumber > 0) {
    // 페이지 이동
    location.href = "" ;
  } else {
    openModal("로그인이 필요해요.<br>메세지는 로그인 후 이용할 수 있어요!");
  }
})

$(document).ready(function() {

  // 메뉴바 css 설정
  const url = window.location.pathname;

  if (url.includes('community')) {
    $("#LI-COMMUNITY-LINK").find("a").addClass("li-menu-select");
  } else if (url.includes('notice')) {
    $("#LI-NOTICE-LINK").find("a").addClass("li-menu-select");
  } else if (url.includes('feedback')) {
    $("#LI-FEEDBACK-LINK").find("a").addClass("li-menu-select");
  } else {
    $("#LI-HOME-LINK").find("a").addClass("li-menu-select");
  }

  // ---------------------------------------------------------------
  
  // 페이지네이션에서 이전, 다음 기호에 마우스 오버시
  // 이전
  $('.previous').hover(function() {
    $(this).text("◀");
  }, function(){
    $(this).text("◁");
  });

  // 다음
  $('.next').hover(function() {
    $(this).text("▶");
  }, function(){
    $(this).text("▷");
  });

});

// ---------------------------------------------------------------

// 시간 형식 포맷
function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = Math.floor((now - past) / 1000); // 초 단위 차이

  if (diff < 60) return "방금 전";
  if (diff < 3600) return Math.floor(diff / 60) + "분 전";
  if (diff < 86400) return Math.floor(diff / 3600) + "시간 전";
  if (diff < 172800) return "어제";
  return Math.floor(diff / 86400) + "일 전";
}

function updateTimeAgo() {
  $(".time-ago").each(function () {
    const ts = $(this).data("timestamp");
    $(this).text(getTimeAgo(ts));
  });
}

// 시간 형식 포맷 함수 사용 (작성일짜 출력) (basic.js)
$(document).ready(function () {
  updateTimeAgo();
})

// ---------------------------------------------------------------

// 팔로우 - 메인, 게시판 디테일, 유저 개인 페이지
// 팔로우 하기
function goFollow(event, element, userNumber) {
  event.stopPropagation();

  if (userNumber > 0) {
    element.innerText = "팔로잉";
    element.setAttribute("onclick", "noFollow(event, this, userNumber)");
    element.setAttribute("class", "button-style basic-button");
  } else {
    openModal("로그인이 필요해요.<br>팔로우는 로그인 후 이용할 수 있어요!");
  }
}

// 팔로우 해제
function noFollow(event, element, userNumber) {
  event.stopPropagation();

  deleteFollow(userNumber);

  element.innerText = "팔로우";
  element.setAttribute("onclick", "goFollow(event, this, userNumber)");
  element.setAttribute("class", "button-style follow-btn");
}

function deleteFollow(userNumber) {
  console.log("팔로우 삭제");
}

// ---------------------------------------------------------------

// 스크랩 - 메인, 게시판 목록 적용
// 스크랩 하기
function goScrap(event, element, userNumber) {
  event.stopPropagation();

  if (userNumber > 0) {
    element.src = "../../image/layout/scrap_ok.png";
    element.setAttribute("onclick", "noScrap(event, this, 0)");
    element.setAttribute("alt", "scrap_ok")
  } else {
    openModal("로그인이 필요해요.<br>스크랩은 로그인 후 이용할 수 있어요!");
  };
}

// 스크랩 해제
function noScrap(event, element, userNumber) {
  event.stopPropagation();
  
  element.src = "../../image/layout/scrap_no.png";
  element.setAttribute("onclick", "goScrap(event, this, userNumber)");
  element.setAttribute("alt", "scrap_no");
}

// ---------------------------------------------------------------

// 닉네임 중복 검사
function isNickUsed($result, nickname, originalNick = null) {
  let nickLength = Array.from(nickname).length; 
  let isCheckNick = false;

  if (nickLength < 2) {
    isCheckNick = false;
    $result.removeAttr("style");
    $result.text("최소 2글자 이상 입력하세요");
  } else if (originalNick === nickname) {
    isCheckNick = true;
    $result.text("");
  } else if (nickLength > 12) {
    isCheckNick = false;
    const trimmed = Array.from(nickname).slice(0, 12).join("");
    $(this).val(trimmed);
  } else {  // 2 ~ 12자 이내일 때 중복 검사
    
    // 중복검사 패스
    $result.text("사용할 수 있는 닉네임이에요");
    $result.css("color", "#064973");
    isCheckNick = true;

    // 중복됨
    // $result.text("다른 닉네임을 입력해 주세요");
    // $result.css("color", "#FF0000");
    // isCheckNick = false;
  }
  // 결과 리턴
  return isCheckNick;
}

// ---------------------------------------------------------------

// 한 줄 소개 30자 제한
function limitUserIntroLength($intro) {
  let introValue = $intro.val();
  let introLength = Array.from(introValue).length;
  
  if (introLength > 30) {
    const trimmed = Array.from(introValue).slice(0, 30).join("");
    $intro.val(trimmed);
  }
}

// ---------------------------------------------------------------

// 단일 이미지 첨부
function setOnePreview(file) {
  if (!file) { return false; }
  
  if (!file.type.match("image.*")) {
    openModal("이미지 파일만 업로드할 수 있어요.");
    return false;
  }
  
  const imageURL = URL.createObjectURL(file);
  $(".img-one-preview").attr("src", imageURL);
  return true;
}

// ---------------------------------------------------------------

// 이미지 등록 버튼 호버
$(".img-regist-btn").hover(function() {
  $(this).attr("src", "../../image/layout/image_regist_btn_hover.png");
}, function(){
  $(this).attr("src", "../../image/layout/image_regist_btn.png");
});

// --------------------------------------------

// 다중 이미지 첨부
// 전역 변수로 선언하여 이미지 누적
let imageFiles = [];
let currentCount = $(".div-thumbnail-wrap").length;

// 이미지 첨부시 미리보기
$(document).ready(function() {
  $("#input-image").on("change", setPreview);
});

function setPreview(e) {
  let files = Array.from(e.target.files);
  let filesList = Array.prototype.slice.call(files);
  let maxCount = 5;

  for (const file of filesList) {
    // 현재까지 저장된 파일 수 + 새로 선택한 수가 5 초과면 차단
    if (currentCount >= maxCount) {
      openModal("이미지는 최대 5개까지만 업로드할 수 있어요.");
      return;
    }
    
    if (!file.type.match("image.*")) {
      openModal("이미지 파일만 업로드할 수 있어요.");
      continue;
    }

    imageFiles.push(file);
    
    let reader = new FileReader(); 
    reader.onload = function(e) {
      let $img = $(`
        <div class="div-thumbnail-wrap" style="display:none;">
          <img src="${e.target.result}" class="img-thumbnail">
        </div>
      `);
      $("#DIV-THUMBNAIL-IMAGE-WRAP").append($img);
      $img.fadeIn(150);
    }
    reader.readAsDataURL(file);
    currentCount++;
    updateUploadButton();
  }
}

// --------------------------------------------

// 마우스 호버에 따른 이미지 삭제 버튼
$(document).on("mouseenter", ".div-thumbnail-wrap", function() {
  const cancelBtn = `
  <span class="span-thumbnail-close-btn">
    <img src="../../image/layout/close_btn_white.png" alt="close">
  </span>
  `;
  $(this).append(cancelBtn);
});

$(document).on("mouseleave", ".div-thumbnail-wrap", function() {
  $(this).find(".span-thumbnail-close-btn").remove();
});

// 이미지 삭제
$(document).on("click", ".span-thumbnail-close-btn", deletePreview);

function deletePreview() {
  const $previewWrap = $(this).closest(".div-thumbnail-wrap");
  const index = $previewWrap.index();
  $previewWrap.fadeOut(150, function() {
    imageFiles.splice(index - 1, 1);
    $previewWrap.remove();
    currentCount--;

    updateUploadButton();
    updateInputFiles();
    updateBackBlock();
  });
}

// --------------------------------------------

// input[type="file"]의 이미지 삭제시 value값 정리
// 페이지 이동 탐지를 위함
function updateInputFiles() {
  const dataTransfer = new DataTransfer();
  for (let i = 0; i < imageFiles.length; i++) {
    dataTransfer.items.add(imageFiles[i]);
  }
  $("input[name='images']")[0].files = dataTransfer.files;
}

// --------------------------------------------

// 이미지 업로드 버튼 숨김, 표시
function updateUploadButton() {
  if (currentCount >= 5) {
    $(".image-column").css("height", "auto")
    $('#LABEL-IMAGE-BTN').hide();
  } else {
    $(".image-column").removeAttr("style");
    $('#LABEL-IMAGE-BTN').show();
  }
}

// --------------------------------------------------------------- 

// 모달
// 모달 열기
function openModal(message, temp = 1, modalId = "#MODAL-ALERT-ONE-A") {
  return new Promise((resolve) => {
    const $modal = $(modalId);
    const $alertWrap = $modal.find(".div-alert-wrap");
    const basicFrame = `
      <div class="div-alert-content">${message}</div>
      <div class="div-alert-btn-wrap">
        <div class="div-alert-btn alert-ok modal-close">확인</div>
        <div class="div-alert-btn alert-no">취소</div>
      </div>
    `;

    $alertWrap.attr("class", "div-alert-wrap");
    $alertWrap.html(basicFrame);

    if (temp == 2) {
      $alertWrap.find(".alert-no").addClass("modal-coutinue");
    }

    // 확인 클릭 시 → true 반환
    $alertWrap.find(".alert-ok").one("click", function () {
      closeModal(modalId);
      resolve(true);
    });

    // 취소 클릭 시 → false 반환
    $alertWrap.find(".alert-no").one("click", function () {
      closeModal(modalId);
      resolve(false);
    });

    $modal.addClass("alert-active").fadeIn(200);
  });
}


// 모달 닫기
function closeModal(modalId = ".div-alert-container") {
  const $modal = $(modalId);
  $modal.removeClass("alert-active");
  $modal.fadeOut(200);
}

$(document).on("click", ".modal-close", function() {
  closeModal();
});

// 모달 닫기(x) 버튼 호버 시 - 마이페이지, 유저 페이지, 메세지함
$(document).on("mouseenter", ".modal-close-img", function() {
    $(this).attr("src", "../../image/layout/close_btn_black.png");
});

$(document).on("mouseleave", ".modal-close-img", function() {
    $(this).attr("src", "../../image/layout/close_btn_grey.png");
});
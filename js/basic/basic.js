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

  element.innerText = "팔로우";
  element.setAttribute("onclick", "goFollow(event, this, userNumber)");
  element.setAttribute("class", "button-style follow-btn");
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

// 이미지 등록 버튼 호버

  $(".img-regist-btn").hover(function() {
    $(this).attr("src", "../../image/layout/image_regist_btn_hover.png");
  }, function(){
    $(this).attr("src", "../../image/layout/image_regist_btn.png");
  });

// --------------------------------------------------------------- 

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
      $("#DIV-PREVIEW-IMAGE-WRAP").append($img);
      $img.fadeIn(150);
      $(".image-column").css("margin-bottom", "122px")
    }
    reader.readAsDataURL(file);
    currentCount++;
    updateUploadButton();
  }
}

// 마우스 호버에 따른 이미지 삭제 버튼
$(document).on("mouseenter", ".div-thumbnail-wrap", function() {
  const cancelBtn = `
  <span class="span-thumbnail-close-btn">
    <img src="../../image/layout/close_btn_black_white.png" alt="close">
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

    if (currentCount == 0) {
      $(".image-column").removeAttr("style");
    }
    updateUploadButton();
    updateInputFiles();
    updateBackBlock();
  });
}

// input[type="file"]의 이미지 삭제시 value값 정리
// 페이지 이동 탐지를 위함
function updateInputFiles() {
  const dataTransfer = new DataTransfer();
  for (let i = 0; i < imageFiles.length; i++) {
    dataTransfer.items.add(imageFiles[i]);
  }
  $("input[name='images']")[0].files = dataTransfer.files;
}

// 이미지 업로드 버튼 숨김, 표시
function updateUploadButton() {
  if (currentCount >= 5) {
    $('#LABEL-IMAGE-BTN').hide();
  } else {
    $('#LABEL-IMAGE-BTN').show();
  }
}

// --------------------------------------------------------------- 

// 모달
// 모달 열기
function openModal(message, temp = 1, modalId = '#MODAL-ALERT-ONE-A') {
  return new Promise((resolve) => {
    const $modal = $(modalId);
    $modal.find('.div-alert-content').html(message);
    $modal.addClass('alert-active');

    if (temp == 2) {
      $modal.find('.alert-no').addClass('modal-coutinue');
    }

    // 확인 클릭 시 → true 반환
    $modal.find('.alert-ok').one('click', function() {
      closeModal(modalId);
      resolve(true);
    });

    // 취소 클릭 시 → false 반환
    $modal.find('.alert-no').one('click', function() {
      closeModal(modalId);
      resolve(false);
    });

    // 모달 표시
    $modal.fadeIn(200);
  });
}

// 모달 닫기
function closeModal(modalId = '.div-alert-container') {
  const $modal = $(modalId);
  $modal.removeClass('alert-active');
  $modal.fadeOut(200);
}

$(document).on('click', '.modal-close', function() {
  closeModal();
});
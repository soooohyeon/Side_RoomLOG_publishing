// 페이지네이션에서 이전, 다음 기호에 마우스 오버시
// 이전
$('.pagenation').hover(function() {
  const className = $(this).attr("class");
  if (className.includes("previous")) {
    $(this).text("◀");
  } else if (className.includes("next")) {
    $(this).text("▶");
  }
}, function(){
  const className = $(this).attr("class");
  if (className.includes("previous")) {
    $(this).text("◁");
  } else if (className.includes("next")) {
    $(this).text("▷");
  }
});

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
// 배너 관리 목록 페이지

// 정렬 카테고리 - 선택한 정렬에 따라 select 여백 조정
$("#SELECT-SORT").click(function() {
  let selectValue = $("#SELECT-SORT");
  
  if (selectValue.val() == "used") {
    selectValue.css("padding", "0 11px");
  } else {
    selectValue.removeAttr("style");
  }
});

// ---------------------------------------------------------------

// 상세 페이지 이동
$(document).on("click", ".view-banner", function() {
  const bannerNumber = $(this).data("banner");
  location.href = "admin-banner-view.html";
});

// --------------------------------------------------------------- 

// 메뉴 버튼 호버
$(document).on("mouseenter", ".td-menu_btn", function() {
  const $img = $(this).find("img");
  $img.attr("src", "../../image/layout/menu_btn_hover.png")
});

$(document).on("mouseleave", ".td-menu_btn", function() {
  const $img = $(this).find("img");
  $img.attr("src", "../../image/layout/menu_btn.png")
});

// --------------------------------

// 버튼 클릭 시 메뉴 열기 
let $currentMenuBtn = null; // 현재 열린 버튼 저장용

$(document).on("click", ".td-menu_btn", function(e) {
  e.stopPropagation();

  // 이전에 클릭한 버튼과 현재 버튼이 같다면 → 메뉴 닫기
  if ($currentMenuBtn && $currentMenuBtn.is($(this))) {
    hideMenu();
    return;
  }

  hideMenu();

  const menuFrame = `
    <div class="div-menu-wrap">
      <div class="div-menu-option update-btn">수정</div>
      <div class="div-menu-option delete-btn">삭제</div>
    </div>
  `;
  $(this).find(".div-menu-btn").css("z-index", "999");
  $(this).append(menuFrame);
  
  // 현재 열린 버튼 기억
  $currentMenuBtn = $(this);
});

// 그 외 영역 클릭시 메뉴 닫기
$(document).on("click", function() {
  hideMenu();
});

// 메뉴 없애기
function hideMenu() {
  $(".div-menu-btn").removeAttr("style");
  $(".div-menu-wrap").remove();
  $currentMenuBtn = null;
}

// --------------------------------------------------------------- 

// 메뉴 - 삭제 클릭 시
$(document).on("click", ".delete-btn", function(e) {
  const deleteBannerMsg = "해당 배너를 삭제하시겠습니까?<br>삭제된 배너는 사용자 화면에서 즉시 제거되며, 이미지 및 연결 정보는 복구할 수 없습니다.";
  const deleteOkBannerMsg = "배너가 삭제되었습니다.";
  e.stopPropagation();
  const bannerNumber = $(this).closest(".view-banner").data("banner");

  openModal(deleteBannerMsg, 2).then((result) => {
    if (result) {
      setTimeout(() => {
        openModal(deleteOkBannerMsg);
        // location.href = "삭제경로";
      }, 50);
    }
  });
});

// --------------------------------

// 메뉴 - 수정 클릭 시
$(document).on("click", ".update-btn", function(e) {
  e.stopPropagation();
  const bannerNumber = $(this).closest(".view-banner").data("banner");
  
  // location.href = "삭제경로";
});
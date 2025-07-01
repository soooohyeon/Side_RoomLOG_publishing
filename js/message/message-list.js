// 카테고리
const $receiveMsgImage = $(".ca-img[data-category='receive-msg']");
const $sendMsgImage = $(".ca-img[data-category='send-msg']");
const imageSrc = {
    receiveMsg: {
        normal: "../../image/message/msg_receive.png",
        selected: "../../image/message/msg_receive_active.png",
        hover: "../../image/message/msg_receive_hover.png"
    },
    sendMsg: {
        normal: "../../image/message/msg_sent.png",
        selected: "../../image/message/msg_sent_active.png",
        hover: "../../image/message/msg_sent_hover.png"
    }
};

// ----------------------------------------

// 카테고리 클릭 시 - 받은 메세지, 보낸 메세지
$(".li-category-wrap").on("click", function () {
    const $categoryGroup = $(this).find(".div-category");
    const category = $categoryGroup.data("category");

    // 탭 상태 토글
    $(".div-category").removeClass("div-selected");
    $categoryGroup.addClass("div-selected");

    // 아이콘 변경 + 슬라이드 전환
    if (category === "receive-msg") {
        $receiveMsgImage.attr("src", imageSrc.receiveMsg.selected);
        $sendMsgImage.attr("src", imageSrc.sendMsg.normal);
        $(".list-slide-wrap").css("transform", "translateX(0%)");
        updateSlideHeight(".receive-msg-list-wrap");
    } else if (category === "send-msg") {
        $sendMsgImage.attr("src", imageSrc.sendMsg.selected);
        $receiveMsgImage.attr("src", imageSrc.receiveMsg.normal);
        $(".list-slide-wrap").css("transform", "translateX(-100%)");
        updateSlideHeight(".send-msg-list-wrap");
    }

    expressCategory($categoryGroup);
});


// ----------------------------------------

// 기본 값은 받은 메세지
// 선 표시
function expressCategory($selectedCategory) {
  const $wrap = $selectedCategory.closest(".li-category-wrap");
  const width = $wrap.innerWidth();
  const moveX = $wrap.position().left;

  $(".ca-selected").css({
    width: width,
    transform: `translateX(${moveX}px)`
  });
}

// 선택 탭의 위치와 너비에 맞춰 활성화 바 이동 및 리사이즈
function updateActiveBar() {
  const $target = $(".div-category.div-selected");
  expressCategory($target);
}

// $(document).ready(upSdateUnderline)와 같음
$(updateActiveBar);

// 가로 너비에 맞춰 활성화 탭 표시 리사이즈되도록 실행
$(window).on("resize", updateActiveBar);


// ----------------------------------------

// 현재 선택되지 않은 카테고리 호버 시 - 받은 메세지, 보낸 메세지
$(".li-category-wrap").hover(function () {
  const $categoryGroup = $(this).find(".div-category");
  const category = $categoryGroup.data("category");
    
    if ($categoryGroup.hasClass("div-selected")) return;
    
    if (category === "receive-msg") {
      $receiveMsgImage.attr("src", imageSrc.receiveMsg.hover);
    } else if (category === "send-msg") {
      $sendMsgImage.attr("src", imageSrc.sendMsg.hover);
    }
  }, function() {
    const $categoryGroup = $(this).find(".div-category");
    const category = $categoryGroup.data("category");
    
    if ($categoryGroup.hasClass("div-selected")) return;

    if (category === "receive-msg") {
        $receiveMsgImage.attr("src", imageSrc.receiveMsg.normal);
    } else if (category === "send-msg") {
        $sendMsgImage.attr("src", imageSrc.sendMsg.normal);
    }
});

// ---------------------------------------------------------------

// 화면에 보여지는 리스트의 높이로 계산하여 자동 설정
function updateSlideHeight(targetSelector) {
    const targetHeight = $(targetSelector).outerHeight(true);
    $(".list-slide-wrap").stop().animate({ height: targetHeight }, 300);    // 애니메이션 효과 넣어줌
}

// ----------------------------------------

// 기본 값은 받은 메세지 기준으로 계산
$(document).ready(function () {
    updateSlideHeight(".receive-msg-list-wrap");
});
// 정렬 카테고리 - 선택한 정렬에 따라 select 여백 조정
$("#SELECT-SORT").click(function() {
  let selectValue = $("#SELECT-SORT");
  
  if (selectValue.val() == "kakao") {
    selectValue.css("padding", "0 25px");
  } else {
    selectValue.removeAttr("style");
  }
});

// --------------------------------------------------------------- 

// 탈퇴 클릭 시
const deleteMsg ="해당 사용자를 탈퇴 처리하면, 작성한 게시글, 댓글, 스크랩 등 모든 활동 기록이 삭제됩니다.<br>작성자의 닉네임 및 프로필 정보 역시 복구할 수 없으며,<br>댓글 중 대댓글이 달린 항목은 순차적으로 삭제됩니다.<br><br>정말 탈퇴를 진행하시겠습니까?";
const deleteOkMsg ="탈퇴 처리되었습니다.";

$(document).on("click", ".div-delete-btn", function(e) {
  e.stopPropagation();
  const userNumber = $(this).closest(".go-page").data("id");

  openModal(deleteMsg, 2).then((result) => {
    if (result) {
      setTimeout(() => {
        openModal(deleteOkMsg);
        // location.href = "탈퇴경로";
      }, 50);
    }
  });
});
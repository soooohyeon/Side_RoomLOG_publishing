// 댓글 삭제
function deleteComment(commentNumber, parentCommentNumber) {
  const deleteCommentMsg = parentCommentNumber === null
    ? "해당 댓글을 삭제하시겠습니까?<br>삭제된 댓글은 복구할 수 없습니다."
    : "해당 댓글에 대댓글이 달려 있어 즉시 삭제할 수 없습니다.<br>댓글은 ‘삭제된 댓글입니다’로 표시되며, 모든 대댓글이 삭제된 이후 자동으로 삭제됩니다.<br><br>정말 삭제하시겠습니까?";
  const deleteOkCommentMsg = parentCommentNumber === null
    ? "댓글이 삭제 되었습니다."
    : "삭제가 신청되었습니다.<br>댓글은 ‘삭제된 댓글입니다’로 표시되며, 순차적으로 삭제됩니다.";
  
  $("#MODAL-ALERT-ONE-A").removeClass("modal-comment");
  openModal(deleteCommentMsg, 2).then(result => {
    console.log("💣 확인용 class:", $("#MODAL-ALERT-ONE-A").attr("class"));
    if (result) {
      setTimeout(() => {
        openModal(deleteOkCommentMsg);
        // location.href = "탈퇴경로";
      }, 50);

    }
  });
}
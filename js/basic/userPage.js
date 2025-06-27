
// 게시글에 이미지가 존재할 경우 너비 조정
document.querySelectorAll(".div-one-post-wrap").forEach(wrap => {
    const noneProfileImgWrap = wrap.querySelector(".div-none-profile img");
    const imgWrap = wrap.querySelector(".div-post-img img");
    if (noneProfileImgWrap && noneProfileImgWrap.complete && noneProfileImgWrap.naturalWidth > 0) {
        wrap.classList.add("has-img");
    }
    if (imgWrap && imgWrap.complete && imgWrap.naturalWidth > 0) {
        wrap.classList.add("has-img");
    }
});

// ---------------------------------------------------------------
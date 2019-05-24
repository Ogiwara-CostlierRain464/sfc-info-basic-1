const PHOTO_1 = "photo1.png";
const PHOTO_2 = "photo2.png";

let currentPhoto = "photo1.png";

/**
 * 写真のスワップを行う
 */
function swapPhoto() {
  const next = nextPhoto(currentPhoto);
  currentPhoto = next;

  document.getElementById("photo").innerHTML = "<img alt='photo1' src='" + next + "' />";
}

/**
 * 次の写真を取得
 */
function nextPhoto(current) {
  return current === PHOTO_1 ? PHOTO_2 : PHOTO_1;
}

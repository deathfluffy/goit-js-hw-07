import { galleryItems } from "./gallery-items.js";

const gallerySet = document.querySelector(".gallery");
const galleryBox = createGallery(galleryItems);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item" style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)">
  <a class="gallery__link" href="${original}" style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)"
    />
  </a>
</div>`;
    })
    .join("");
}
gallerySet.insertAdjacentHTML("beforeend", galleryBox);
gallerySet.addEventListener("click", selectGalleryContainer);

function selectGalleryContainer(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600" style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)">`,

    {
      onShow: () => {
        window.addEventListener("keydown", onKeydownEsc);
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeydownEsc);
      },
    }
  );

  const onKeydownEsc = (event) => {
    console.log(event.code);
    if (event.code === "Escape") {
      instance.close();
    }
  };

  instance.show();
}

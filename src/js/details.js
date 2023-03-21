import { checkImgLoading, preloadImg } from './slides'

export const setupDetails = () => {
  const $$button = document.querySelectorAll(".toggle-details")
  for (const $button of $$button) {
    const $details =
      $button.parentElement.querySelector(".details") ??
      $button.closest(".details")
    $button.addEventListener("click", () => {
      $details.classList.toggle("hidden")

      const $firstSlide = $details.querySelector('.slides .slide[is-selected]')
      checkImgLoading($firstSlide)
      if ($firstSlide && $firstSlide.nextElementSibling) {
        preloadImg($firstSlide.nextElementSibling)
      }
    })
  }
}

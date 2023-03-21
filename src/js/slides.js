export const checkImgLoading = $slide => {
  if (!$slide || $slide.dataset.loaded) return

  const $img = $slide.querySelector('img')
  if ($img.complete) {
    $slide.dataset.loaded = true
    return
  }

  $slide.dataset.loaded = false

  $img.addEventListener('load', () => {
    $slide.dataset.loaded = true
  }, { once: true })
}

export const preloadImg = $slide => {
  if (!$slide || $slide.dataset.loaded) return

  const $img = $slide.querySelector('img')
  if ($img.complete) return

  // eslint-disable-next-line compat/compat
  fetch($img.src)
}

const getLeftOrRight = ($slide, xTarget) => {
  const { left, right } = $slide.getBoundingClientRect()
  const xMiddle = (left + right) / 2

  return xTarget < xMiddle ? 'left' : 'right'
}

export const setupSlides = () => {
  const $$slides = document.querySelectorAll(".slides")
  for (const $slides of $$slides) {
    $slides.dataset.now = 1
    $slides.dataset.length = $slides.children.length

    $slides.addEventListener('click', e => {
      const $selected = $slides.querySelector('[is-selected]')
      $selected.removeAttribute('is-selected')

      const place = getLeftOrRight($slides, e.clientX)

      if (place === 'right') {
        if ($selected.nextElementSibling) {
          $selected.nextElementSibling.setAttribute('is-selected', 'is-selected')
          checkImgLoading($selected.nextElementSibling)
          $slides.dataset.now++
          if ($selected.nextElementSibling.nextElementSibling) {
            preloadImg($selected.nextElementSibling.nextElementSibling)
          }
        } else {
          $slides.firstElementChild.setAttribute('is-selected', 'is-selected')
          $slides.dataset.now = 1
        }
      } else if (place === 'left') {
        if ($selected.previousElementSibling) {
          $selected.previousElementSibling.setAttribute('is-selected', 'is-selected')
          checkImgLoading($selected.previousElementSibling)
          $slides.dataset.now--
          if ($selected.previousElementSibling.previousElementSibling) {
            preloadImg($selected.previousElementSibling.previousElementSibling)
          }
        } else {
          $slides.lastElementChild.setAttribute('is-selected', 'is-selected')
          checkImgLoading($slides.lastElementChild)
          $slides.dataset.now = $slides.childElementCount
          if ($selected.lastElementChild.previousElementSibling) {
            preloadImg($selected.lastElementChild.previousElementSibling)
          }
        }
      }
    })
  }
}

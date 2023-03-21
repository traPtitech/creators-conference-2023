export const setupImgLink = () => {
  const $links = document.querySelectorAll('.img-link')
  for (const $link of $links) {
    $link.addEventListener('click', e => {
      e.preventDefault()
      const href = $link.querySelector('img').src
      $link.href = href
      $link.click()
    }, { once: true })
  }
}

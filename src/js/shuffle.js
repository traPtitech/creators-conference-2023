// fisher-yates shuffle
const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const shuffleChildren = parent => {
  const shuffledChildren = shuffle(parent.children)
  parent.innerHTML = ''
  parent.append(...shuffledChildren)
}

const restoreChildren = (parent, order) => {
  const restoredChildren = order.map(key => parent.querySelector(`[data-key=${key}]`))
  parent.innerHTML = ''
  parent.append(...restoredChildren)
}

const restoreOrder = () => {
  const data = localStorage.getItem('order')
  const { categories, groups } = JSON.parse(data)

  const $categories = document.querySelector('#categories')
  restoreChildren($categories, categories)

  const $$groups = $categories.querySelectorAll('.groups')
  for (const [i, $groups] of $$groups.entries()) {
    restoreChildren($groups, groups[i])
  }
}

const saveOrder = $categories => {
  const categories =
    [...$categories.children].map($category => $category.dataset.key)
  const groups = []
  for (const $category of $categories.children) {
    groups.push(
      [
        ...$category.querySelector('.groups').children
      ].map($group => $group.dataset.key)
    )
  }
  const updateAt = document.querySelector('#categories').getAttribute('updateat');

  const data = JSON.stringify({ categories, groups, updateAt })
  localStorage.setItem('order', data)
}

export const shuffleGroups = () => {
  if (localStorage.getItem('order') !== null) {
    const data = localStorage.getItem('order')
    const { updateAt } = JSON.parse(data)
    const date = document.querySelector('#categories').getAttribute('updateat');
    if (date == updateAt){
      restoreOrder()
      return
    }
  }

  const $categories = document.querySelector('#categories')
  shuffleChildren($categories)

  const $$groups = $categories.querySelectorAll('.groups')
  for (const $groups of $$groups) {
    shuffleChildren($groups)
  }

  saveOrder(document.querySelector('#categories'))
}

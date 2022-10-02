const items = document.querySelectorAll('.menu__item')

items.forEach(item => {
  item.addEventListener('click', function(e){
    e.preventDefault()
    let num = item.getAttribute('href')
    let elem = document.querySelector(num)
    elem.scrollIntoView({
      behavior: 'smooth'
    })
  })
})
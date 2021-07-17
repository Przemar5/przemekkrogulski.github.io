const contactForm = document.querySelector('.contact__form')
const myMail = 'primero.el.dev@gmail.com'

contactForm.addEventListener('submit', (e) => {
	e.preventDefault()
	let subject = e.target.querySelector('[name="subject"]').value
	let message = e.target.querySelector('[name="message"]').value

	window.open('mailto:' + encodeURI(myMail) + 
		'?subject=' + encodeURI(subject) + 
		'&body=' + encodeURI(message))
})
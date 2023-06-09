class Nav {
	navBtn = document.querySelector<HTMLButtonElement>('.hamburger')!
	nav = document.querySelector<HTMLMenuElement>('.nav__box')!
	navLinks = document.querySelectorAll<HTMLMenuElement>('.nav__box-item')!
	searchBtn = document.querySelector<HTMLButtonElement>('.nav__search-btn')!
	searchNav = document.querySelector<HTMLDivElement>('.nav__search')!

	openMobileNav = () => {
		if (this.searchNav.classList.contains('--active')) {
			this.searchNav.classList.remove('--active')
			this.navBtn.classList.remove('is-active')
			document.body.classList.remove('disable-scroll')
		} else {
			this.nav.classList.toggle('--active')
			this.navBtn.classList.toggle('is-active')
			document.body.classList.toggle('disable-scroll')
		}
	}
	closeMobileNav = () => {
		this.nav.classList.remove('--active')
		this.navBtn.classList.remove('is-active')
		document.body.classList.remove('disable-scroll')
	}
	openSearchMobile = () => {
		this.searchNav.classList.toggle('--active')
		this.navBtn.classList.toggle('is-active')
		document.body.classList.toggle('disable-scroll')
	}
	closeSearchMobile = () => {
		this.searchNav.classList.remove('--active')
		this.navBtn.classList.remove('is-active')
		document.body.classList.remove('disable-scroll')
	}
}

const nav = new Nav()
const closeSearchMobile = nav.closeSearchMobile

nav.navBtn.addEventListener('click', nav.openMobileNav)
nav.searchBtn.addEventListener('click', nav.openSearchMobile)
nav.navLinks.forEach(item => item.addEventListener('click', nav.closeMobileNav))

export { closeSearchMobile }
class Footer {
	footerYear = document.querySelector<HTMLSpanElement>('.current-year')!

	getCurrentYear = () => {
		return new Date().getFullYear()
	}
	addYearToFooter = () => {
		this.footerYear.textContent = this.getCurrentYear().toString()
	}
}

export const footer = new Footer()
export const currentYear = footer.getCurrentYear()
footer.addYearToFooter()

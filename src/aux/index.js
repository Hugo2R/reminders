export const nowID = () => Date.now()

export const today = () => {
	const x = new Date()
	const d = x.getDate()
	return x.getFullYear() + '-' + (Number(x.getMonth()) + 1) + '-' + (d < 10 ? '0' + d : d);
}

export const showPeriod = (date, period) => {
	const now = new Date()
	const timeInADay = 86400000
	const diffInDays = (now - (+new Date(date) + now.getTimezoneOffset() * 60000)) / timeInADay
	let t = 0

	switch (period) {
		case 'd': t = diffInDays; break
		case 'w': t = diffInDays / 7; break
		case 'y': t = diffInDays / 365; break
		case 'm': t = diffInDays * 12 / 365; break
	}

	return t ? `${t.toFixed(1)} ${period}` : date
}

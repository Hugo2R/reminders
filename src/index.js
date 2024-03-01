import { html, Component, render } from 'htm/preact/standalone.module.js'
import Item from './list-item'
import { nowID, today } from './aux'
import './styles.css'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			list: localStorage.list && JSON.parse(localStorage.list) || [],
			id: 0,
			event: '',
			date: today(),
		}

		this.getVal = this.getVal.bind(this)
		this.saveEvent = this.saveEvent.bind(this)
		this.removeEvent = this.removeEvent.bind(this)
		this.editEvent = this.editEvent.bind(this)
		this.togglePeriod = this.togglePeriod.bind(this)
	}	

	getVal = e => {
		this.setState({[e.target.name]: e.target.value})
	}

  saveEvent = e => {
  	e.preventDefault()
  	const { id, event, date, list } = this.state
  	let items = [];

  	if (!id) {
  	 items = [ ...list, { id: nowID(), event, date, period:'' } ]
  	} else {
  		items = [...list]
	  	const itemId = list.findIndex(i => i.id === id)
	  	items[itemId] = { id, event, date, length: items[itemId].period }
  	}

		this.setState({ list: items, date: today(), event: '', id:0 },
		() => {
			localStorage.list = JSON.stringify(this.state.list)
			
		})
  }

	removeEvent = id => {
  	const items = this.state.list.filter(i => i.id !== id)
		this.setState({ list: items},
			() => {
				localStorage.list = JSON.stringify(this.state.list)
			})
	}

	editEvent = data => { this.setState(data) }

	togglePeriod = id  => {
		const { list } = this.state
		const itemId = list.findIndex(i => i.id === id)
		const	items = [...list]

		switch (items[itemId].period) {
			case 'd': items[itemId].period = 'w'; break
			case 'w': items[itemId].period = 'm'; break
			case 'm': items[itemId].period = 'y'; break
			case 'y': items[itemId].period = ''; break
			case '':
			default: items[itemId].period = 'd'
		}
		this.setState({ list: items},
			() => {
				localStorage.list = JSON.stringify(this.state.list)
			})
	}

	render() {
		return html`
			<div className="navbar"><div className="container">Reminders<//><//>
			<div className="container">
				<form onSubmit=${this.saveEvent} autocomplete="off" className="inline">
					<input name="event" placeholder="Event" onChange=${this.getVal} value=${this.state.event} required autoFocus />
					<input name="date" type="date" onChange=${this.getVal} value=${this.state.date} required />
					<button type="submit">${this.state.id ? 'Save': 'Add'}</button>
				<//>
				<ul className="list">
					${this.state.list.map(i => html`
						<${Item} key=${i.event} data=${i}
							onRemove=${() => this.removeEvent(i.id)}
							onEdit=${() => this.editEvent(i)}
							togglePeriod=${() => this.togglePeriod(i.id)}
						/>
					`)}
				<//>
			<//>
		`
	}
}

render(html`<${App} />`, document.body)

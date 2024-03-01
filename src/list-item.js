import { html } from 'htm/preact/standalone.module.js'
import { showPeriod } from './aux'
const ListItem = ({data, onRemove, onEdit, togglePeriod}) => {
	return html `
	<li className="item">
		<span className="event" onClick=${onEdit}>${data.event}<//>
		<button className="date" onClick=${togglePeriod}>${showPeriod(data.date, data.period)}<//>
		<button className="remove" onClick=${onRemove}>×<//>
	<//>
	`
}

export default ListItem

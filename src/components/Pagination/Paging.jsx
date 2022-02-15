import React, { Component } from 'react';
import { Row, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
const DEFAULT_LIMIT = 50;

export default class Paging extends Component {

	onLimitChange = (e) => {
		e.preventDefault();
		if (typeof this.props.onChange != 'function') return;
		let limit = parseInt(e.target.value);
		if (limit <= 0) limit = DEFAULT_LIMIT;
		let page = Math.max(Math.ceil(this.props.total / limit), 1);
		this.props.onChange(1, limit);
	}

	onChange = (e, page, limit) => {
		e.preventDefault();
		if (typeof this.props.onChange != 'function') return;
		this.props.onChange(page, limit);
	}

	renderPages = () => {
		let { total, page, limit } = this.props;
		if (total === 0) return null;
		
		let pages = Math.min(Math.ceil(total / limit) || 5, 5);
		console.log(pages)
		total = Math.max(parseInt(total) || 0, 0);
		limit = (limit && limit > 0) ? limit : DEFAULT_LIMIT;
		let max = Math.ceil(total / limit);
		if (max === 0) return null;
		page = Math.min(Math.max(page || 1, 1), max);
		let start = (max <= pages || page <= pages / 2) ? 1
			: Math.min((page - Math.floor(pages / 2)), (max - pages) + 1);
		let items = [];

		if (max > pages) {
			let previous;
			(page - 1 < 1) ? previous = 1 : previous = page - 1;
			items.push((
				<PaginationItem key={'first'}>
					<PaginationLink href="#" onClick={e => this.onChange(e, previous, limit)}>&lt;</PaginationLink>
				</PaginationItem>
			));
		}
		for (let i=start; i<(start + pages); i++) {
			items.push((
				<PaginationItem active={i === page} key={i}>
					<PaginationLink href="#" onClick={e => this.onChange(e, i, limit)}>{i}</PaginationLink>
				</PaginationItem>
			));
		}
		if (max > pages) {
			let next;
			(next + 1 > max) ? next = max : next = page + 1;
			items.push((
				<PaginationItem key={'last'}>
					<PaginationLink href="#" onClick={e => this.onChange(e, next, limit)}>&gt;</PaginationLink>
				</PaginationItem>
			));
		}
		return items;
	}

	render() {
		return (
			<Row className="react-bootstrap-table-pagination">
				<Pagination>
					{ this.renderPages() }
				</Pagination>
			</Row>
		);
	}
	
}

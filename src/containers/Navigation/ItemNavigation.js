import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleButton from '../../components/ToggleButton/ToggleButton';

const ItemNavigation = ({ themeMode, params }) => {
	const navigationStyle = {
		position: 'fixed',
		width: '100%',
		background: 'var(--header)',
	};
	const navigationNav = {
		display: 'flex',
		listStyle: 'none',
		justifyContent: 'space-around',
		alignContent: 'center',
		justifyItems: 'inherit',
		alignItems: 'center',
		flexDirection: 'row',
		maxWidth: '980px',
		margin: '0 auto',
		padding: 0,
	};
	const navigationLink = {
		display: 'flex',
		padding: '11px 7.5px',
		textDecoration: 'none',
		fontWeight: 500,
		color: 'var(--content)',
	};
	const navigationLinkActive = {
		color: 'var(--link)',
		fontWeight: 600,
		borderBottom: '3px solid var(--link)',
	};

	return (
		<header style={navigationStyle}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<h3 style={{ color: 'var(--link)' }}><Link to="/">Hacker news</Link></h3>
				<ToggleButton themeMode={themeMode} />
			</div>
			<div>
				<ul style={navigationNav}>
					<li>
						<NavLink
							id="news-link"
							to={`/item/article/${params.item}`}
							style={navigationLink}
							activeStyle={navigationLinkActive}
							isActive={(match, location) => /article/.test(location.pathname)}
						>
							Link
						</NavLink>
					</li>
					<li>
						<NavLink
							id="top-news-link"
							to={`/item/comments/${params.item}`}
							style={navigationLink}
							activeStyle={navigationLinkActive}
							isActive={(match, location) => /comments/.test(location.pathname)}
						>
							Comments
						</NavLink>
					</li>
				</ul>
			</div>
		</header>
	);
};
ItemNavigation.propTypes = {
	currentMode: PropTypes.string,
};

export default withRouter(ItemNavigation);

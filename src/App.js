// @ts-nocheck
import React, { Fragment, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Skeleton from './components/Skeleton';
import Progress from './components/Progress/Progress';
import Snackbar from './components/Snackbar';

const Navigation = lazy(() => import('./containers/Navigation/Navigation'));
const ItemNavigation = lazy(() => import('./containers/Navigation/ItemNavigation'));
const StoryContainer = lazy(() => import('./containers/StoryContainer'));
const ItemCommentsContainer = lazy(() => import('./containers/ItemCommentsContainer'));
const ItemArticleContainer = lazy(() => import('./containers/ItemArticleContainer'));
const UserContainer = lazy(() => import('./containers/UserContainer'));

const renderLoader = () => <Skeleton height="38px"></Skeleton>;

function App() {
	const [themeMode, setThemeMode] = React.useState('');
	const [isOffLine, setIsOffLine] = React.useState(false);

	React.useEffect(() => {
		const currentTheme = localStorage.getItem('theme');
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		const currentMode = prefersDarkScheme.matches ? 'dark' : 'light';

		if (!currentTheme) {
			localStorage.setItem('theme', currentMode);
		}

		setThemeMode(currentTheme || currentMode);
		document.body.classList.add(currentTheme || currentMode);
		window.addEventListener('online', handleStatusNavigation);
		window.addEventListener('offline', handleStatusNavigation);
		return () => {
			window.removeEventListener('online', handleStatusNavigation);
			window.removeEventListener('offline', handleStatusNavigation);
		};
	}, []);

	const handleStatusNavigation = ({ type }) => setIsOffLine(type !== 'online');

	return (
		<Fragment>
			<Suspense fallback={renderLoader()}>
				<Switch>
					<Route path={'/item/:type/:item'} render={({ match }) => <ItemNavigation {...match} {...{ themeMode, isOffLine }} />} />
					<Route path={'/'} render={() => <Navigation {...{ themeMode, isOffLine }} />}/>
				</Switch>
			</Suspense>
			<main className="container">
				<Suspense fallback={<Progress />}>
					<Switch>
						<Route
							path={[
								'/news/:page?',
								'/news/:page?/over',
								'/newest/:page?',
								'/show/:page?',
								'/ask/:page?',
								'/jobs/:page?',
							]}
							render={({ match, history }) => (
								<StoryContainer isOffLine={isOffLine} {...match} {...history} />
							)}
						/>

						<Route
							path="/item/comments/:item"
							render={({ match, history }) => (
								<ItemCommentsContainer isOffLine={isOffLine} {...match} {...history} />
							)}
						/>
						<Route
							path="/item/article/:item"
							render={({ match, history }) => (
								<ItemArticleContainer isOffLine={isOffLine} {...match} {...history} />
							)}
						/>
						<Route
							path="/user/:user?"
							render={({ match, history }) => (
								<UserContainer isOffLine={isOffLine} {...match} {...history} />
							)}
						/>
						<Route
							path="*"
							render={() => {
								return <Redirect to="/news/1" />;
							}}
						/>
					</Switch>
				</Suspense>
			</main>
			<ToastContainer />
			<Snackbar showStatus={isOffLine} />
		</Fragment>
	);
}

export default App;

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStoryItem } from '../api/fetchApi';
import { validateItem, isValidObject } from '../util/validators';

function ItemArticleContainer(props = {}) {
	const { params } = props;
	const [isValidItem, setValidItem] = useState(true);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const isValidItem = validateItem(params.item);
		if (!isValidItem) {
			setValidItem(isValidItem);
			return;
		}
		async function getComments(item = 0) {
			const storyItem = await getStoryItem(item);
			const { url } = storyItem;
			setValidItem(isValidObject(storyItem) && !!url);
			setUrl(url);
		}
		getComments(params.item);
	}, [params.item]);

	return (
		<Fragment>
			{isValidItem && (
				<iframe className='itemIframe' src={url} title="Article source" />
			)}
			{!isValidItem && <h1 style={{ margin: '15px' }}>Story does not have an article (it's a text post)</h1>}
		</Fragment>
	);
}
ItemArticleContainer.propTypes = {
	props: PropTypes.object,
};

export default ItemArticleContainer;

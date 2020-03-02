import Clipboard from 'clipboard';
import React, { useLayoutEffect, useEffect } from 'react';

import { MeteorProvider } from '../providers/MeteorProvider';
import { useReactiveValue } from '../hooks/useReactiveValue';
import { useSetting } from '../contexts/SettingsContext';

function GoogleTagManager() {
	const tagManagerId = useSetting('GoogleTagManager_id');

	useEffect(() => {
		if (window.dataLayer && window.dataLayer.length > 0) {
			return;
		}

		if (typeof tagManagerId === 'string' && tagManagerId.trim() !== '') {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'gtm.start': new Date().getTime(),
				event: 'gtm.js',
			});
			const f = document.getElementsByTagName('script')[0];
			const j = document.createElement('script');
			j.async = true;
			j.src = `//www.googletagmanager.com/gtm.js?id=${ tagManagerId }`;
			f.parentNode.insertBefore(j, f);
		}
	}, [tagManagerId]);

	return null;
}

export function App({ getPortals }) {
	useLayoutEffect(() => {
		document.body.classList.add('global-font-family', 'color-primary-font-color');

		return () => {
			document.body.classList.remove('global-font-family', 'color-primary-font-color');
		};
	}, []);

	useLayoutEffect(() => {
		const initialPageLoadingElement = document.getElementById('initial-page-loading');

		if (!initialPageLoadingElement) {
			return;
		}

		initialPageLoadingElement.style.display = 'none';

		return () => {
			initialPageLoadingElement.style.display = 'flex';
		};
	}, []);

	useEffect(() => {
		const clipboard = new Clipboard('.clipboard');

		return () => {
			clipboard.destroy();
		};
	}, []);

	const portals = useReactiveValue(getPortals);

	return <MeteorProvider>
		<div id='alert-anchor' />
		<div className='tooltip'>
			<div className='content' />
			<div className='tooltip-arrow' />
		</div>
		{portals}
		<GoogleTagManager />
	</MeteorProvider>;
}

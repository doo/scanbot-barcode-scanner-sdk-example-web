import { useState, useEffect } from 'react';
import ScanbotSDK from 'scanbot-web-sdk';
import singleBarcodeScan from './utils/singleBarcode';

const SectionList = ({ sections }) => (
	<div>
		{sections.map((section, index) => (
			<div key={index}>
				<h2>{section.title}</h2>
				{section.data.map((item, itemIndex) => (
					<div key={itemIndex}>
						<h3>
							<a href='#' onClick={item.onCLick}>
								{item.title}
							</a>
						</h3>
					</div>
				))}
			</div>
		))}
	</div>
);

function App() {
	const [scanbotSDK, setScanbotSDK] = useState<any | null>(null);

	useEffect(() => {
		async function initializeSDK() {
			try {
				const sdkInstance = await ScanbotSDK.initialize({
					licenseKey: '',
				});
				setScanbotSDK(sdkInstance);
			} catch (error) {
				console.error('Failed to initialize Scanbot SDK:', error);
			}
		}

		initializeSDK();
	}, []);

	const callWithLicense = async (scanningFunction) => {
		const licenseInfo = await scanbotSDK.getLicenseInfo();

		licenseInfo.isValid()
			? scanningFunction()
			: alert('License is expired or invalid.');
	};

	const sectionListData = [
		{
			title: 'Barcode Scanning Use Cases',
			data: [
				{
					title: 'Scan Single Barcodes',
					onClick: () =>
						callWithLicense(singleBarcodeScan(scanbotSDK)),
				},
				{
					title: 'Scanning Multiple Barcodes',
					onClick: () => console.log('Scanning Multiple Barcodes'),
				},
				{
					title: 'Batch Scanning',
					onClick: () => console.log('Batch Scanning'),
				},
				{
					title: 'Scanning Tiny Barcodes',
					onClick: () => console.log('Scanning Tiny Barcodes'),
				},
				{
					title: 'Detect Barcode On Image',
					onClick: () => console.log('Detect Barcode On Image'),
				},
			],
		},
		{
			title: 'Barcode AR Overlay Use Cases',
			data: [
				{
					title: 'AR-MultiScan',
					onClick: () => console.log('AR-MultiScan'),
				},
				{
					title: 'AR-SelectScan',
					onClick: () => console.log('AR-SelectScan'),
				},
			],
		},
	];

	return (
		<>
			<h1>App</h1>
			<SectionList sections={sectionListData} />
			<div id='scanner'></div>
		</>
	);
}

export default App;

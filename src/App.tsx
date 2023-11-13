import { useState, useEffect } from 'react';
import ScanbotSDK from 'scanbot-web-sdk';
import {
	useMultipleBarcodeScan,
	useSingleBarcodeScan,
	useScanAndCountScan,
	useARMultiScan,
} from "./utils";

const SectionList = ({ sections }) => (
	<div>
		{sections.map((section, index) => (
			<div key={index}>
				<h2>{section.title}</h2>
				{section.data.map((item, itemIndex) => (
					<div key={itemIndex}>
						<h3>
							<a href='#' onClick={item.scanningFunction}>
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
		console.log('clicked');
		const licenseInfo = await scanbotSDK.getLicenseInfo();

		licenseInfo.isValid()
			? scanningFunction()
			: alert('License is expired or invalid.');
	};

	const sectionListData = [
		{
			title: "Barcode Scanning Use Cases",
			data: [
				{
					title: "Scan Single Barcodes",
					scanningFunction: () =>
						callWithLicense(useSingleBarcodeScan(scanbotSDK)),
				},
				{
					title: "Scanning Multiple Barcodes",
					scanningFunction: () =>
						callWithLicense(useMultipleBarcodeScan(scanbotSDK)),
				},
				{
					title: "Scan and Count",
					scanningFunction: () =>
						callWithLicense(useScanAndCountScan(scanbotSDK)),
				},
				{
					title: "Scanning Tiny Barcodes",
					scanningFunction: () =>
						console.log("Scanning Tiny Barcodes"),
				},
			],
		},
		{
			title: "Barcode AR Overlay Use Cases",
			data: [
				{
					title: "AR-MultiScan",
					scanningFunction: () => useARMultiScan(scanbotSDK),
				},
				{
					title: "AR-SelectScan",
					scanningFunction: () => console.log("AR-SelectScan"),
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

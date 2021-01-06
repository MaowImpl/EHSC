'use strict';

// -------
// Imports
// -------

require('./style.css');
require('flexboxgrid');
import convert = require('xml-js');

// -------
// Utils
// -------

function error(message: string, show = true) {
	console.error(message);
	if (show) {
		showModal(message);
	}
}

function getKeyFromIndex(object: convert.Element, index: number) : string {
	return Object.keys(object)?.[index];
}

// -------
// Types
// -------

const documentTypes = ['Extension', 'Computer', 'Mission', 'Actions', 'Faction', 'Person'];

// -------
// Error Message Modal
// -------

const errorModal = document.getElementById('errorModal') as HTMLDivElement;
const errorClose = document.getElementById('errorClose') as HTMLSpanElement;
const errorMsg = document.getElementById('errorMsg') as HTMLParagraphElement;

function showModal(message: string) {
	errorMsg.textContent = message;
	errorModal.style.display = 'block';
}

errorClose?.addEventListener('click', () => {
	errorModal.style.display = 'none';
});

errorModal?.addEventListener('click', () => {
	errorModal.style.display = 'none';
})

// -------
// XML/IO
// -------

const ehsUpload = document.getElementById('ehsUpload') as HTMLInputElement;
const ehsConvert = document.getElementById('ehsConvert') as HTMLButtonElement;

let files: FileList | null;

ehsUpload?.addEventListener('change', () => {
	files = ehsUpload.files;
});

ehsConvert?.addEventListener('click', () => {
	if (files?.length === 1) {
		const file: File | null = files.item(0);
		if (file) readXml(file);
	}
});

async function readXml(file: File) {
	const text = await file.text();
	const xml = convert.xml2js(text, { compact: true, trim: true }) as convert.Element;
	const type = getType(xml);
	if (type) console.log(type);
}

function getType(xml: convert.Element) : string | undefined {
	const index = (xml?.declaration) ? 1 : 0;
	const key = getKeyFromIndex(xml, index);
	if (!documentTypes.includes(key)) {
		error('Type of document is not registered as a valid type, should be any of these:\n' + documentTypes);
		return undefined;
	}
}
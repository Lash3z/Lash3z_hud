// Google Sheets Unified Sync
import fetch from 'node-fetch';

const SHEET_API_URL = 'https://script.google.com/macros/s/REPLACE_WITH_SCRIPT_ID/exec';

async function fetchSheetData(sheetName) {
  try {
    const res = await fetch(`${SHEET_API_URL}?action=getSheet&sheet=${sheetName}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch ${sheetName} from Google Sheets:`, err);
    return [];
  }
}

export async function fetchLucky7Data() {
  return await fetchSheetData('Lucky7');
}

export async function fetchHuntsData() {
  return await fetchSheetData('Hunts');
}

export async function fetchTournamentsData() {
  return await fetchSheetData('Tournaments');
}

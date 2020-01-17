import React from 'react';
import {render} from '@testing-library/react';
import SortingTable from "./SortingTable";

const accounts = [{
    "_id": "5d9ddef4915161280000853b",
    "id": 1,
    "name": "Spread bet",
    "default": true,
    "funds": 10000,
    "profitLoss": 0.23,
    "accountType": "IGSB",
    "isDemo": false,
    "currency": "$"
}, {
    "_id": "5d9ddef4915161280000853c",
    "id": 2,
    "name": "New Spread bet",
    "default": false,
    "funds": 1000,
    "profitLoss": -679,
    "accountType": "IGSB",
    "isDemo": false,
    "currency": "$"
}, {
    "_id": "5d9ddef4915161280000853d",
    "id": 3,
    "name": "Spread bet - demo",
    "default": false,
    "funds": 20000000,
    "profitLoss": 16.211,
    "accountType": "IGSB",
    "isDemo": true,
    "currency": "$"
}, {
    "_id": "5d9ddef4915161280000853e",
    "id": 4,
    "name": "CFD - demo",
    "default": false,
    "funds": 20000000,
    "profitLoss": 16679,
    "accountType": "IGCFD",
    "isDemo": true,
    "currency": "€"
}, {
    "_id": "5d9ddef4915161280000853f",
    "id": 5,
    "name": "My CFD",
    "default": false,
    "profitLoss": 0,
    "accountType": "IGCFD",
    "isDemo": false,
    "currency": "$"
}, {
    "_id": "5d9ddef49151612800008540",
    "id": 6,
    "name": "Stockbroking - DEMO",
    "default": true,
    "funds": 0,
    "profitLoss": 200045,
    "accountType": "IGSTK",
    "isDemo": true,
    "currency": "$"
}, {
    "_id": "5d9ddef49151612800008541",
    "id": 7,
    "name": "Stockbroking",
    "default": true,
    "funds": 0,
    "profitLoss": 200045,
    "accountType": "IGSTK",
    "isDemo": false,
    "currency": "€"
}];
const accountTypes = {
    "IGSB": "Spread bet account",
    "IGCFD": "CFD account",
    "IGSTK": "Share dealing account",
    "IGISA": "Individual Savings Account",
    "IGFX": "Forex account"
};

test('renders table', () => {
    const {getByText, getAllByText} = render(<SortingTable accounts = {accounts} accountTypes = {accountTypes}/>);
    for(const account of accounts) {
        const accountTypesElements = getAllByText(accountTypes[account.accountType]);
        for(const typeElement of accountTypesElements) {
            expect(typeElement).toBeInTheDocument();
        }
        const accountNames = getAllByText(account.name);
        for(const nameElement of accountNames) {
            expect(nameElement).toBeInTheDocument();
        }
        const profitLosses = getAllByText(account.currency + ' ' +account.profitLoss);
        for(const profitLossElement of profitLosses) {
            expect(profitLossElement).toBeInTheDocument();
        }
    }

});

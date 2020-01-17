import React, { useState } from 'react';
const style = {
    table: {
        width: '100%',
        textAlign: 'left',
    }
};

const renderAccounts = (accounts, accountTypes, sortedFields) => {
    const accountsClone = [...accounts];
    if (sortedFields.length) {
        accountsClone.sort((a, b) => {
            for(const field of sortedFields) {
                if (a[field] > b[field]) {
                    return 1
                }
                if (a[field] < b[field]) {
                    return -1
                }
            }
            return 0;
        });
    }
    return accountsClone.map(({id, name, profitLoss, accountType, currency}) => (
        <tr key={id}>
            <td>{name}</td>
            <td>{currency} {profitLoss}</td>
            <td>{accountTypes[accountType]}</td>
        </tr>))
};

const SortingTable = ({accounts, accountTypes}) => {
    const [sortedFields, setSortedFields] = useState([]);
    const sort = (event) => {
        const eventField = event.target.getAttribute('data-field');
        setSortedFields((state) => {
            const index = state.indexOf(eventField);
            if(index === -1) {
                return [...state, eventField];
            } else {
                let newState = [...state];
                newState.splice(index, 1);
                return newState;
            }
        })
    };
    return (
        <table style={style.table}>
            <thead>
            <tr onClick={sort}>
                <th data-field='name'>Name {sortedFields.includes('name') && 'Sort'}</th>
                <th data-field='profitLoss'>Profit & Loss {sortedFields.includes('profitLoss') && 'Sort'}</th>
                <th>Account Type</th>
            </tr>
            </thead>
            <tbody>
            {renderAccounts(accounts, accountTypes, sortedFields)}
            </tbody>
        </table>
    )
};

export default SortingTable;
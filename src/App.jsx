import React, {Component} from 'react';
import SortingTable from './SortingTable';

const headers = {
  'x-apikey': '5d9f48133cbe87164d4bb12c'
};

class App extends Component {
  state = {
    accounts: [],
    accountTypes: {},
    loadingStatus: null
  };
  async fetchAccounts() {
    const accountsResponse = await fetch('https://recruitmentdb-508d.restdb.io/rest/accounts', {
      method: 'get',
      headers,
    });
    return await accountsResponse.json();
  }
  async fetchAccountsTypes() {
    const accountsTypesResponse = await fetch('https://recruitmentdb-508d.restdb.io/rest/accounttypes', {
      method: 'get',
      headers,
    });
    const types = await accountsTypesResponse.json();
    if(!types.length) throw new Error('No account types');
    return types.reduce((acc, {id, title}) => ({...acc, [id]: title}), {});
  }
  async fetchData() {
    try {
      const accountsArray = await Promise.all([this.fetchAccounts(), this.fetchAccountsTypes()]);
      const accounts = accountsArray[0];
      const accountTypes = accountsArray[1];
      this.setState({accounts, accountTypes, loadingStatus: 'success'});
    } catch(e) {
      this.setState({loadingStatus: 'error'});
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
        <div className="App">
          {this.loadingStatus}
          {this.state.loadingStatus === 'success' ?
              <SortingTable accounts={this.state.accounts} accountTypes={this.state.accountTypes}/> :
              this.state.loadingStatus === 'error' ? <h1>Error</h1> : <h1>Loading...</h1>}
        </div>
    );
  }
}

export default App;

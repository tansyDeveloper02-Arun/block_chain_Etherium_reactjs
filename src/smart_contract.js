import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
// import ApartmentDetails from './'
class App extends Component{

  constructor(props){
    super(props);
    
    this.state ={manager:'', Owner:'',contractor_balance:'',owner_balance:'',contractor:'', value:'',value2:'',value3:'',value4:'',value5:'',apartment_numbers:'',Get_units:{},get_units_visible:false, Get_flats:{},get_flats_visible:false,listItems:'',set_unit_transaction_hash:'',set_unit_transaction_visible:false, assign_unit_transaction_visible:false,
    assign_unit_transaction_hash:''}
  }

  async componentDidMount(){
    // console.log(web3.eth.personal.getAccounts())
    const account = await web3.eth.personal.getAccounts()

    // const Owner = web3.givenProvider.selectedAddress;
    const Owner = account[0];
    const contractor =  await lottery.options.address;
    const manager =  await lottery.methods.contractOwnerAddress()
    .call()
    // .send({
    //   from:account[0],
    //   to:contractor
    // });

    const owner_balance = await web3.eth.getBalance(Owner);

    const apartment_numbers = await lottery.methods.getApartments().call();
    const listItems = apartment_numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    const contractor_balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({
      manager,
      Owner,
      contractor_balance,
      owner_balance,
      contractor,
      apartment_numbers,
      listItems
    })
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const units_identifier = await lottery.methods.getUnit(this.state.value).call();
    this.setState({
      get_flats_visible:true,
      Get_flats :units_identifier
    })
  }

  onUnitSubmit= async (event) => {
    event.preventDefault();
    const units_identifier2 = await lottery.methods.unitNumbers(this.state.value2).call();
    this.setState({
      get_units_visible:true,
      Get_units :units_identifier2
    })
  }

  onSetUnitSubmit= async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts()
    const contractor =  await lottery.options.address;
    const units_identifier2 = await lottery.methods.setUnitOwner(this.state.value3, this.state.value4, false, this.state.value5).send({
        from:accounts[0],
        to:contractor
      });

    this.setState({
      set_unit_transaction_visible:true,
      set_unit_transaction_hash:units_identifier2.transactionHash
    })
  }
  onAssignTenantSubmit = async (event) => {
    event.preventDefault();
    
    const units_identifier = await lottery.methods.getUnit(this.state.value6).call();
    const contractor =  await lottery.options.address;

    const Assign_tenant_data = await lottery.methods.AssignTenants(this.state.value6, this.state.value7).send({
      from:units_identifier[1],
      to:contractor
    })
    this.setState({
      assign_unit_transaction_visible:true,
      assign_unit_transaction_hash:Assign_tenant_data.transactionHash
    })
  }
  render(){
    const SET_UNIT_BASE_URL = "https://rinkeby.etherscan.io/tx/" + this.state.set_unit_transaction_hash;
    const ASSIGN_UNIT_BASE_URL = "https://rinkeby.etherscan.io/tx/" + this.state.assign_unit_transaction_hash;
    return (
      <div style={{textAlign:"left"}}>
        <h2>Current Account: {this.state.Owner}</h2>
        <h2>Contractor: {this.state.contractor}</h2>
        <h2>Owner Balance: {this.state.owner_balance}</h2>
        <h2>Contractor Balance: {web3.utils.fromWei(this.state.contractor_balance, 'ether')}</h2>
        <h2>Count Units: {this.state.manager}</h2>
        <h2>Apartment Assigned</h2>
        <ul>
        {this.state.listItems}
        </ul>
        <hr />
        <form onSubmit={this.onSetUnitSubmit}>
          <h2>Set Unit Owner</h2>
          Flat_number: <input
            value={this.state.value3}
            onChange={event => this.setState({ value3: event.target.value})}
          />
          Owner Address: <input
            value={this.state.value4}
            onChange={event => this.setState({ value4: event.target.value})}
          />
          Amount: <input
            value={this.state.value5}
            type="number"
            onChange={event => this.setState({ value5: event.target.value})}
          />
          <p></p>
          <button>Enter</button>
          {this.state.set_unit_transaction_visible === true? 
          <div> 
            <p>Transaction Hash:  {this.state.set_unit_transaction_hash}</p>
            <a href={SET_UNIT_BASE_URL}> {SET_UNIT_BASE_URL}</a>
            {/* <p>Tenant:  {this.state.Get_units[2]}</p>
            <p>Flat_number:  {this.state.Get_units[4]}</p> */}
          </div>:null}
        </form>
        <hr/>
        
        <form onSubmit={this.onSubmit}>
          <h2>Get Flat Details</h2>
          <input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value})}
          />
          {this.state.get_flats_visible === true ? 
          <div> 
            <p>Owner:  {this.state.Get_flats[1]}</p>
            <p>Tenant:  {this.state.Get_flats[2]}</p>
            <p>Amount:  {this.state.Get_flats[4]}</p>
          </div>:null}
          <button>Enter</button>
        </form>
        <hr/>
        <form onSubmit={this.onUnitSubmit}>
          <h2>Get Particular Unit Id</h2>
          <input
            value={this.state.value2}
            onChange={event => this.setState({ value2: event.target.value})}
          />
          {this.state.get_units_visible === true ? 
          <div> 
            <p>Flat Number:  {this.state.Get_units}</p>
            {/* <p>Tenant:  {this.state.Get_units[2]}</p>
            <p>Flat_number:  {this.state.Get_units[4]}</p> */}
          </div>:null}
          <button>Enter</button>
        </form>
        <hr/>
        <form onSubmit={this.onAssignTenantSubmit}>
          <h2>Assign Tenants</h2>
          Flat_number: <input
            value={this.state.value6}
            onChange={event => this.setState({ value6: event.target.value})}
          />
          Tenant Address: <input
            value={this.state.value7}
            onChange={event => this.setState({ value7: event.target.value})}
          />
          <p></p>
          <button>Enter</button>
          {this.state.assign_unit_transaction_visible === true? 
          <div> 
            <p>Transaction Hash:  {this.state.assign_unit_transaction_hash}</p>
            <a href={ASSIGN_UNIT_BASE_URL}> {ASSIGN_UNIT_BASE_URL}</a>
            {/* <p>Tenant:  {this.state.Get_units[2]}</p>
            <p>Flat_number:  {this.state.Get_units[4]}</p> */}
          </div>:null}
        </form>
        <hr/>
      </div>
    );
  }
}
// function App() {
//   console.log(web3.version);
//   web3.eth.getAccounts().then(console.log)
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
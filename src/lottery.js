import Web3 from './web3';
import ApartmentDetails1 from "./contracts/ApartmentDetails.json"
import ApartmentDetails2 from "./contracts/Migrations.json"
// const contract_address = ApartmentDetails.networks['5777'].address
const address = ApartmentDetails2.networks['5777'].address;
// console.log(ApartmentDetails2.networks['5777'].address)
// console.log(typeof(address))
const abi = ApartmentDetails1.abi;

export default new Web3.eth.Contract(abi,address);
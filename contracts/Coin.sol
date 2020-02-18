pragma solidity ^0.4.19;
contract ApartmentDetails {
struct OwnerDetails {
uint unitNumber;
address unitOwner;
address unitTenant;
bool occupied;
uint monthlyRent;
}
modifier onlyOwner{
require(msg.sender==contractOwner);
_;
}
/* modifier onlyUnitOwner(uint _unitNumber){
require(msg.sender==ownerDetails[_unitnumber].unitOwner);
_;
}*/
mapping(uint => OwnerDetails) ownerDetails;
uint[] public unitNumbers;
//owner details address delcaration
address contractOwner;/*function ApartmentDetails() public{
owner = msg.sender;
}*/
function ApartmentDetails() public{
contractOwner=msg.sender;
}
/* function AssignOwner(uint _unitNumber;
address _unitOwner;
address _unitTenant;
bool _occupied;
uint _monthlyRent;) public onlyOwner
{
}*/
///This method is to input the owner details
function setUnitOwner(uint Flat_Number,
address Flat_Owner,
//address _unitTenant,
bool Occupied,
uint Monthly_Rent) public{
var ownerdetail=ownerDetails[Flat_Number];
ownerdetail.unitNumber=Flat_Number;
ownerdetail.unitOwner=Flat_Owner;
ownerdetail.occupied=Occupied;ownerdetail.monthlyRent=Monthly_Rent;
unitNumbers.push(Flat_Number)-1;
}
///This method will return all the unit in the appartment
function getAppartmentUnits() public view returns (uint[]) {
return unitNumbers;
}
///This method is to get the unit details
function getUnit(uint Flat_Number) public view returns (uint, address,address, bool,uint) {
return (ownerDetails[Flat_Number].unitNumber, ownerDetails[Flat_Number].unitOwner,
ownerDetails[Flat_Number].unitTenant,
ownerDetails[Flat_Number].occupied,ownerDetails[Flat_Number].monthlyRent);
}
///This method is to get the count of units
function countUnits() public view returns (uint) {
return unitNumbers.length;
}
///This method assigns tenant to the required unit of flat
function AssignTenants(uint Flat_Number, address Tenant) public returns(bool){//onlyUnitOwner(_unitnumber) public returns(bool){
require(msg.sender==ownerDetails[Flat_Number].unitOwner);
if(ownerDetails[Flat_Number].occupied==false)
{
ownerDetails[Flat_Number].unitTenant=Tenant;
ownerDetails[Flat_Number].occupied=true;
//ownerDetails[_unitnumber].unitTenant="0x583031D1113aD414F02576BD6afaBfb302140225";
}
}
///this function is to transfer the funds from tenant account to owner account
function RentPayment(uint Flat_Number, uint Monthly_Rent) public payable{
require(msg.sender==ownerDetails[Flat_Number].unitTenant);
address ownerAdd=ownerDetails[Flat_Number].unitOwner;
ownerAdd.transfer(Monthly_Rent);
}
}
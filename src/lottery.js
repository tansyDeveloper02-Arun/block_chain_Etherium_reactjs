import Web3 from './web3';
import ApartmentDetails1 from "./contracts/Apartments.json"

var count = null
if(Web3.eth.givenProvider.networkVersion === undefined){
  count = Web3.givenProvider.networkVersion
}else{
  count = Web3.eth.givenProvider.networkVersion
}
console.log(count)
const address = ApartmentDetails1.networks['1584579223498'].address;
// const address = "0x30227ddd4d95789455BaF5dBf012Ec50A8ee1463";

// console.log(ApartmentDetails2.networks['5777'].address)
// console.log(typeof(address))
const abi = ApartmentDetails1.abi;

// const abi = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_tenant_address",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_unit_owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_start_date",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_end_date",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_contract_timestamp",
// 				"type": "string"
// 			}
// 		],
// 		"name": "AssignTenant",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address payable",
// 				"name": "_new_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "AssignUnitOwner",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_unit_owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_start_date",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_end_date",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_contract_timestamp",
// 				"type": "string"
// 			}
// 		],
// 		"name": "clickToRent",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_apartment_name",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_door_number",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_street",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_locality",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_postal_code",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_created_date",
// 				"type": "string"
// 			}
// 		],
// 		"name": "createApartment",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_number",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint128",
// 				"name": "_floor",
// 				"type": "uint128"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_direction",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_monthly_rent",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_sqft",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint128",
// 				"name": "_bed_rooms",
// 				"type": "uint128"
// 			},
// 			{
// 				"internalType": "uint128",
// 				"name": "_bath_rooms",
// 				"type": "uint128"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "_maintainance",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "_rented",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_current_tenent_address",
// 				"type": "address"
// 			}
// 		],
// 		"name": "createUnit",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_type",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_person",
// 				"type": "address"
// 			}
// 		],
// 		"name": "distinctOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "initiate_ids",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_year",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_month",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_total_rent",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_paid_ammount",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_payment_timestamp",
// 				"type": "string"
// 			}
// 		],
// 		"name": "payRent",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "returnAdvance",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "unitMaintainanceClose",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "unitMaintainanceOpen",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "vacateTenant",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_address",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "checkApartmentOwnership",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_address",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "checkUnitOwnership",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "contractOwnerAddress",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getApartmentOwner",
// 		"outputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getApartments",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "apartment_name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "door_number",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "street",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "locality",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "postal_code",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "address payable",
// 						"name": "apartment_owner",
// 						"type": "address"
// 					},
// 					{
// 						"components": [
// 							{
// 								"internalType": "uint256",
// 								"name": "unit_id",
// 								"type": "uint256"
// 							},
// 							{
// 								"internalType": "uint256",
// 								"name": "apartment_id",
// 								"type": "uint256"
// 							},
// 							{
// 								"internalType": "uint256",
// 								"name": "unit_number",
// 								"type": "uint256"
// 							},
// 							{
// 								"internalType": "address payable",
// 								"name": "unit_owner",
// 								"type": "address"
// 							},
// 							{
// 								"internalType": "uint128",
// 								"name": "floor",
// 								"type": "uint128"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "direction",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "uint256",
// 								"name": "monthly_rent",
// 								"type": "uint256"
// 							},
// 							{
// 								"internalType": "uint256",
// 								"name": "sqft",
// 								"type": "uint256"
// 							},
// 							{
// 								"internalType": "uint128",
// 								"name": "bed_rooms",
// 								"type": "uint128"
// 							},
// 							{
// 								"internalType": "uint128",
// 								"name": "bath_rooms",
// 								"type": "uint128"
// 							},
// 							{
// 								"internalType": "bool",
// 								"name": "maintainance",
// 								"type": "bool"
// 							},
// 							{
// 								"internalType": "bool",
// 								"name": "rented",
// 								"type": "bool"
// 							},
// 							{
// 								"internalType": "address",
// 								"name": "current_tenent_address",
// 								"type": "address"
// 							}
// 						],
// 						"internalType": "struct Apartments.unit[]",
// 						"name": "unit_bundle",
// 						"type": "tuple[]"
// 					}
// 				],
// 				"internalType": "struct Apartments.apartment_bundle[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_apartment_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getApartmentUnits",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "apartment_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_number",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "address payable",
// 						"name": "unit_owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "floor",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "direction",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "monthly_rent",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "sqft",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bed_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bath_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "maintainance",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "rented",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "current_tenent_address",
// 						"type": "address"
// 					}
// 				],
// 				"internalType": "struct Apartments.unit[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_tenant_address",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getContract",
// 		"outputs": [
// 			{
// 				"internalType": "int256",
// 				"name": "",
// 				"type": "int256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getCurrentContract",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "indexOfUnit",
// 		"outputs": [
// 			{
// 				"internalType": "int256",
// 				"name": "",
// 				"type": "int256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "myApartments",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "apartment_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "apartment_name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "door_number",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "street",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "locality",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "postal_code",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "address payable",
// 						"name": "apartment_owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "created_date",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct Apartments.Apartment[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_tenant",
// 				"type": "address"
// 			}
// 		],
// 		"name": "myRentedUnits",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "apartment_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_number",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "address payable",
// 						"name": "unit_owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "floor",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "direction",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "monthly_rent",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "sqft",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bed_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bath_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "maintainance",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "rented",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "current_tenent_address",
// 						"type": "address"
// 					}
// 				],
// 				"internalType": "struct Apartments.unit[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "myUnits",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "apartment_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "unit_number",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "address payable",
// 						"name": "unit_owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "floor",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "direction",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "monthly_rent",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "sqft",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bed_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "uint128",
// 						"name": "bath_rooms",
// 						"type": "uint128"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "maintainance",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "rented",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "current_tenent_address",
// 						"type": "address"
// 					}
// 				],
// 				"internalType": "struct Apartments.unit[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_unit_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "myUnitsRentHistory",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "payment_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "contract_id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "year",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "month",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "total_rent",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "paid_ammount",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "payment_timestamp",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct Apartments.rent_payment[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

export default new Web3.eth.Contract(abi,address);
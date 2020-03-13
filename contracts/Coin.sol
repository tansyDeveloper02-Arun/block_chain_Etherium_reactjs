pragma solidity ^0.6.3;
pragma experimental ABIEncoderV2;

contract  Apartments{
    address public contractOwnerAddress;
    uint256 apartment_id_generator;
    uint256 unit_id_generator;
    uint256 contract_id_generator;
    uint256 payment_id_generator;

    mapping(address => mapping(uint256 => uint256[]))personal; //1:apartment 2:unit 3:contract 4:rent
    Apartment[] apartment_buildings;
    unit[] Units;
    unit_contract[] unit_contracts;
    rent_payment[] rents;

    struct Apartment{
        uint256 apartment_id;
        string apartment_name;
        string door_number;
        string street;
        string locality;
        string postal_code;
        address payable apartment_owner;
        string created_date;
    }

    struct unit{
        uint256 unit_id;
        uint256 apartment_id;
        uint256 unit_number;
        address payable unit_owner;
        uint128 floor;
        string direction;
        uint256 monthly_rent;
        uint256 sqft;
        uint128 bed_rooms;
        uint128 bath_rooms;
        bool maintainance;
        bool rented;
        address current_tenent_address;
    }

    struct unit_contract{
        uint256 contract_id;
        uint256 unit_id;
        address tenant_address;
        uint256 advance_payment;
        address unit_owner;
        string start_date;
        string end_date;
        string contract_timestamp;
    }

    struct rent_payment{
        uint256 payment_id;
        uint256 contract_id;
        uint256 year;
        string month;
        uint256 total_rent;
        uint256 paid_ammount;
        string payment_timestamp;
    }

    constructor() public{
        contractOwnerAddress = msg.sender;
        initiate_ids();
    }

    function initiate_ids() public{
        apartment_id_generator = 0;
        unit_id_generator = 0;
        contract_id_generator = 0;
        payment_id_generator = 0;
    }

    function createApartment(string memory _apartment_name,
                            string memory _door_number,
                            string memory _street,
                            string memory _locality,
                            string memory _postal_code,
                            string memory _created_date) public {
            
            apartment_buildings.push(Apartment(apartment_id_generator++,
                                                _apartment_name,
                                                _door_number,
                                                _street,
                                                _locality,
                                                _postal_code,
                                                msg.sender,
                                                _created_date));

            personal[msg.sender][1].push(apartment_id_generator);
        }

    function createUnit(uint256 _apartment_id,
                        uint256 _unit_number,
                        uint128 _floor,
                        string memory _direction,
                        uint256 _monthly_rent,
                        uint256 _sqft,
                        uint128 _bed_rooms,
                        uint128 _bath_rooms,
                        bool _maintainance,
                        bool _rented,
                        address _current_tenent_address) public{
            
            require(checkApartmentOwnership(msg.sender,_apartment_id),"The person trying to create unit is not the owner of building");

            Units.push(unit(unit_id_generator++,
                        _apartment_id,
                        _unit_number,
                        msg.sender,
                        _floor,
                        _direction,
                        _monthly_rent,
                        _sqft,
                        _bed_rooms,
                        _bath_rooms,
                        _maintainance,
                        _rented,
                        _current_tenent_address));

            personal[msg.sender][2].push(unit_id_generator);
    }

    function AssignUnitOwner(uint256 _apartment_id, uint256 _unit_id,address payable _new_owner) public{
        require(checkApartmentOwnership(msg.sender,_apartment_id),"The person trying to create unit is not the owner of building");
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        Units[uint256(indexOfUnit(_unit_id))].unit_owner = _new_owner;
        distinctOwnership(_unit_id, 2, _new_owner);
    }

    function AssignTenant(uint256 _apartment_id,
                    uint256 _unit_id,
                    address _tenant_address,
                    address _unit_owner,
                    uint256 _advance_payment,
                    string memory _start_date,
                    string memory _end_date,
                    string memory _contract_timestamp) public{
        require(Units[_unit_id].unit_owner == msg.sender,"The person trying to assign tenant is not the owner of building");
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[uint256(indexOfUnit(_unit_id))].rented == false,"The selected unit is already rented");
        Units[uint256(indexOfUnit(_unit_id))].current_tenent_address = _tenant_address;
        Units[uint256(indexOfUnit(_unit_id))].rented = true;
        distinctOwnership(_unit_id, 2, _tenant_address);
        unit_contracts.push(unit_contract(_unit_id,
                                        contract_id_generator++,
                                        _tenant_address,
                                        _advance_payment,
                                        _unit_owner,
                                        _start_date,
                                        _end_date,
                                        _contract_timestamp));
        distinctOwnership(contract_id_generator, 3, _tenant_address);
    }

    function vacateTenant(uint256 _apartment_id,uint256 _unit_id) public{
        require(Units[_unit_id].unit_owner == msg.sender,"The person trying to vacate tenant is not Unit Owner");
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[uint256(indexOfUnit(_unit_id))].rented, "The unit you are trying to vacate is already vacant");
        require(Units[uint256(indexOfUnit(_unit_id))].apartment_id == _apartment_id, "unit doesnot belong to the said apartment");
        Units[uint256(indexOfUnit(_unit_id))].rented = false;
        Units[uint256(indexOfUnit(_unit_id))].current_tenent_address = address(0);
    }

    function payRent(uint256 _apartment_id, uint256 _unit_id,
                        uint256 _year,
                        string memory _month,
                        uint256 _total_rent,
                        uint256 _paid_ammount,
                        string memory _payment_timestamp) public payable{  //requires metadata {from: account, value: value}
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[uint256(indexOfUnit(_unit_id))].current_tenent_address == msg.sender,"The person paying rent is not tenent");
        require(getContract(_unit_id,msg.sender)>=0,"Contract not found");
        require(msg.sender.balance >= msg.value,"Insufficient funds");
        Units[_unit_id].unit_owner.transfer(msg.value);
        rents.push(rent_payment(payment_id_generator++,
                        uint256(getContract(_unit_id,msg.sender)),
                        _year,
                        _month,
                        _total_rent,
                        _paid_ammount,
                        _payment_timestamp));
        distinctOwnership(payment_id_generator, 4, msg.sender);
    }

    function unitMaintainanceClose(uint256 _unit_id) public{
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[_unit_id].unit_owner == msg.sender,"The person trying to vacate tenant is not Unit Owner");
        Units[uint256(indexOfUnit(_unit_id))].maintainance = true;
    }

    function unitMaintainanceOpen(uint256 _unit_id) public{
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[_unit_id].unit_owner == msg.sender,"The person trying to vacate tenant is not Unit Owner");
        Units[uint256(indexOfUnit(_unit_id))].maintainance = false;
        Units[uint256(indexOfUnit(_unit_id))].rented = false;
    }

    struct apartment_bundle{
        string apartment_name;
        string door_number;
        string street;
        string locality;
        string postal_code;
        address payable apartment_owner;
        unit[] unit_bundle;
    }

    function getApartments() public view returns(apartment_bundle[] memory){
        apartment_bundle[] memory temp = new apartment_bundle[](apartment_buildings.length);
        for(uint128 i; i < apartment_buildings.length;i++){
            temp[i] = apartment_bundle(apartment_buildings[i].apartment_name,
                                        apartment_buildings[i].door_number,
                                        apartment_buildings[i].street,
                                        apartment_buildings[i].locality,
                                        apartment_buildings[i].postal_code,
                                        apartment_buildings[i].apartment_owner,
                                        getApartmentUnits(apartment_buildings[i].apartment_id));
        }
        return temp;
    }

    function getApartmentUnits(uint256 _apartment_id)public view returns(unit[] memory){
        uint256 counter;
        for(uint128 i; i<Units.length; i++){
            if(Units[i].apartment_id == _apartment_id){
                counter++;
            }
        }
        unit[] memory temp = new unit[](counter);
        for(uint128 i; i<Units.length; i++){
            if(Units[i].apartment_id == _apartment_id){
                temp[i] = Units[i];
            }
        }
        return temp;
    }

    function myApartments(address _owner)public view returns(Apartment[] memory){
        Apartment[] memory temp1 = new Apartment[](personal[_owner][1].length);
        for(uint128 i; i < personal[_owner][1].length ; i++){
            if(apartment_buildings[i].apartment_owner == _owner){
                temp1[i] = apartment_buildings[i];
            }
        }
        return temp1;
    }

    function myUnits(address payable _owner)public view returns(unit[] memory){
        unit[] memory temp2 = new unit[](personal[_owner][2].length);
        for(uint256 i; i < personal[_owner][2].length ; i++){
            if(Units[i].unit_owner == _owner){
                temp2[i] = Units[i];
            }
        }
        return temp2;
    }

    function myUnitsRentHistory(uint256 _unit_id) public view returns(rent_payment[] memory){
        require(getCurrentContract(_unit_id) >= 0,"contract not found");
        require(Units[_unit_id].unit_owner == msg.sender);
        uint256 contract_id = uint256(getCurrentContract(_unit_id));
        rent_payment[] memory temp3 = new rent_payment[](personal[msg.sender][4].length);
        for(uint128 i; i<rents.length; i++){
            if(rents[i].contract_id == contract_id){
                temp3[i] = rents[i];
            }
        }
        return temp3;
    }

    function myRentedUnits(address _tenant)public view returns(unit[] memory){
        unit[] memory temp4 = new unit[](personal[_tenant][4].length);
        for(uint128 i; i < personal[_tenant][4].length ; i++){
            if(Units[i].current_tenent_address == _tenant){
                temp4[i] = Units[i];
            }
        }
        return temp4;
    }

    function clickToRent(uint256 _unit_id,
                    address _unit_owner,
                    uint256 _advance_payment,
                    string memory _start_date,
                    string memory _end_date,
                    string memory _contract_timestamp) public payable{
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        Units[uint256(indexOfUnit(_unit_id))].current_tenent_address = msg.sender;
        Units[uint256(indexOfUnit(_unit_id))].rented = true;
        distinctOwnership(_unit_id, 2, msg.sender);
        Units[_unit_id].unit_owner.transfer(msg.value);
        unit_contracts.push(unit_contract(_unit_id,
                                        contract_id_generator++,
                                        msg.sender,
                                        _advance_payment,
                                        _unit_owner,
                                        _start_date,
                                        _end_date,
                                        _contract_timestamp));
        distinctOwnership(contract_id_generator, 3, msg.sender);
    }

    function returnAdvance(uint256 _unit_id) public{
        require(Units[_unit_id].unit_owner == msg.sender,"The person trying to vacate tenant is not Unit Owner");
        require(indexOfUnit(_unit_id)>=0,"unit not found");
        require(Units[uint256(indexOfUnit(_unit_id))].rented, "The unit you are trying to vacate is already vacant");
        Units[uint256(indexOfUnit(_unit_id))].rented = false;
        Units[uint256(indexOfUnit(_unit_id))].current_tenent_address = address(0);
    }

    //=========================================
    //===========helper methods================
    //=========================================

    function checkApartmentOwnership(address _address,uint256 _apartment_id) public view returns(bool){
        if(apartment_buildings[_apartment_id].apartment_owner == _address){
                return true;
            }
    }

    function getContract(uint256 _unit_id, address _tenant_address)public view returns(int256){
        for(uint128 i; i<unit_contracts.length; i++){
            if(unit_contracts[i].unit_id == _unit_id && unit_contracts[i].tenant_address == _tenant_address){
                return i;
            }
        }
        return -1;
    }

    function getCurrentContract(uint256 _unit_id)public view returns(uint256){
        for(uint256 i; i<unit_contracts.length; i++){
            if(unit_contracts[i].unit_id == _unit_id){
                return i;
            }
        }
        return 0;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function getApartmentOwner(uint256 _apartment_id) public view returns(address payable){
        for(uint128 i; i < apartment_buildings.length ;i++){
            if(apartment_buildings[i].apartment_id == _apartment_id){
                return apartment_buildings[i].apartment_owner;
            }
        }
        return address(0);
    }

    function checkUnitOwnership(address _address,uint256 _unit_id) public view returns(bool){
        for(uint128 i; i < personal[_address][2].length ;i++){
            if(personal[_address][1][i] == _unit_id){
                return true;
            }
        }
        return false;
    }

    function indexOfUnit(uint256 _unit_id) public view returns(int256){
        for(uint128 i; i < Units.length ;i++){
            if(Units[i].unit_id == _unit_id){
                return i;
            }
        }
        return -1;
    }

    function distinctOwnership(uint256 _id, uint256 _type, address _person) public{
        for(uint128 i; i < personal[_person][_type].length ;i++){
            if(personal[_person][_type][i] == _id){
                return ;
            }
        }
        personal[_person][_type].push(_id);
    }
 }
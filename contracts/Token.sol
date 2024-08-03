//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.24;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract Floppy is ERC20("Floppy", "FLP"), ERC20Burnable, Ownable {
    uint256 private cap = 50_000_000_000 * 10 ** uint256(18);

    struct Hotel {
        string tenPhong;
        uint256 donGia;
        string tienIch;
        uint256 khuyenMai;
        string anh1;
        string anh2;
    }

    struct LichSu {
        string idTranfer;
        string addressPhong;
        string addressFrom;
        string addressTo;
        uint256 amount;
        uint256 time;
        uint256 gasPrice;
        string tenKhach;
        string email;
        string sdt;
    }

    mapping(address => Hotel) private hotels;
    address[] private hotelAddresses;

    mapping(address => LichSu) private lichSus;
    address[] private lichSuAddresses;

    constructor() {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= cap, "Floppy: cap exceeded");
        _mint(to, amount);
    }

    // Thêm hotel mới
    function addHotel(
        address hotelAddress,
        string memory tenPhong,
        uint256 donGia,
        string memory tienIch,
        uint256 khuyenMai,
        string memory anh1,
        string memory anh2
    ) public onlyOwner {
        require(
            bytes(hotels[hotelAddress].tenPhong).length == 0,
            "Hotel already exists"
        );
        hotels[hotelAddress] = Hotel(
            tenPhong,
            donGia,
            tienIch,
            khuyenMai,
            anh1,
            anh2
        );
        hotelAddresses.push(hotelAddress);
    }

    // Xóa hotel
    function removeStudent(address hotelAddress) public onlyOwner {
        require(
            bytes(hotels[hotelAddress].tenPhong).length != 0,
            "Hotel does not exist"
        );
        delete hotels[hotelAddress];

        // Xóa địa chỉ hotel khỏi danh sách
        for (uint256 i = 0; i < hotelAddresses.length; i++) {
            if (hotelAddresses[i] == hotelAddress) {
                hotelAddresses[i] = hotelAddresses[hotelAddresses.length - 1];
                hotelAddresses.pop();
                break;
            }
        }
    }

    // Lấy thông tin hotel
    function getStudent(
        address hotelAddress
    )
        public
        view
        returns (
            string memory tenPhong,
            uint256 donGia,
            string memory tienIch,
            uint256 khuyenMai,
            string memory anh1,
            string memory anh2
        )
    {
        require(
            bytes(hotels[hotelAddress].tenPhong).length != 0,
            "Hotel does not exist"
        );
        Hotel memory hotel = hotels[hotelAddress];
        return (
            hotel.tenPhong,
            hotel.donGia,
            hotel.tienIch,
            hotel.khuyenMai,
            hotel.anh1,
            hotel.anh2
        );
    }

    // Lấy danh sách tất cả sinh viên
    function getAllStudents() public view returns (address[] memory) {
        return hotelAddresses;
    }

    // string idTranfer;
    // string addressPhong;
    // string addressFrom;
    // string addressTo;
    // uint256 amount;
    // uint256 time;
    // string tenKhach;
    // string email;
    // string sdt;

    // Thêm lich su mới
    function addLichSu(
        address lichSuAddress,
        string memory idTranfer,
        string memory addressPhong,
        string memory addressFrom,
        string memory addressTo,
        uint256 amount,
        uint256 time,
        uint256 gasPrice,
        string memory tenKhach,
        string memory email,
        string memory sdt
    ) public onlyOwner {
        require(
            bytes(lichSus[lichSuAddress].idTranfer).length == 0,
            "Lich su already exists"
        );
        lichSus[lichSuAddress] = LichSu(
            idTranfer,
            addressPhong,
            addressFrom,
            addressTo,
            amount,
            time,
            gasPrice,
            tenKhach,
            email,
            sdt
        );
        lichSuAddresses.push(lichSuAddress);
    }

    // Lấy thông tin lich su
    function getLichSu(
        address lichSuAddress
    )
        public
        view
        returns (
            string memory idTranfer,
            string memory addressPhong,
            string memory addressFrom,
            string memory addressTo,
            uint256 amount,
            uint256 time,
            uint256 gasPrice,
            string memory tenKhach,
            string memory email,
            string memory sdt
        )
    {
        require(
            bytes(lichSus[lichSuAddress].idTranfer).length != 0,
            "Lich su does not exist"
        );
        LichSu memory lichSu = lichSus[lichSuAddress];
        return (
            lichSu.idTranfer,
            lichSu.addressPhong,
            lichSu.addressFrom,
            lichSu.addressTo,
            lichSu.amount,
            lichSu.time,
            lichSu.gasPrice,
            lichSu.tenKhach,
            lichSu.email,
            lichSu.sdt
        );
    }

    // Lấy danh sách tất cả lichsu
    function getAllLichSu() public view returns (address[] memory) {
        return lichSuAddresses;
    }
}

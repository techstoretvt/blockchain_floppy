//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.24;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract Floppy is ERC20("Floppy", "FLP"), ERC20Burnable, Ownable {
    uint256 private cap = 50_000_000_000 * 10 ** uint256(18);

    // Danh sách sinh viên
    struct Student {
        string name;
        uint256 age;
    }

    mapping(address => Student) private students;
    address[] private studentAddresses;

    constructor() {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= cap, "Floppy: cap exceeded");
        _mint(to, amount);
    }

    // Thêm sinh viên mới
    function addStudent(
        address studentAddress,
        string memory name,
        uint256 age
    ) public onlyOwner {
        require(
            bytes(students[studentAddress].name).length == 0,
            "Student already exists"
        );
        students[studentAddress] = Student(name, age);
        studentAddresses.push(studentAddress);
    }

    // Xóa sinh viên
    function removeStudent(address studentAddress) public onlyOwner {
        require(
            bytes(students[studentAddress].name).length != 0,
            "Student does not exist"
        );
        delete students[studentAddress];

        // Xóa địa chỉ sinh viên khỏi danh sách
        for (uint256 i = 0; i < studentAddresses.length; i++) {
            if (studentAddresses[i] == studentAddress) {
                studentAddresses[i] = studentAddresses[
                    studentAddresses.length - 1
                ];
                studentAddresses.pop();
                break;
            }
        }
    }

    // Lấy thông tin sinh viên
    function getStudent(
        address studentAddress
    ) public view returns (string memory name, uint256 age) {
        require(
            bytes(students[studentAddress].name).length != 0,
            "Student does not exist"
        );
        Student memory student = students[studentAddress];
        return (student.name, student.age);
    }

    // Lấy danh sách tất cả sinh viên
    function getAllStudents() public view returns (address[] memory) {
        return studentAddresses;
    }
}

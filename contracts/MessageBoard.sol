// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Simple Message Board DApp on Base
/// @notice Users can post short messages which are stored on-chain.
contract MessageBoard {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }

    Message[] private messages;

    event NewMessage(address indexed sender, string text, uint256 timestamp);

    /// @notice Post a new message
    /// @param _text The message content
    function postMessage(string calldata _text) external {
        require(bytes(_text).length > 0, "Message cannot be empty");

        messages.push(
            Message({
                sender: msg.sender,
                text: _text,
                timestamp: block.timestamp
            })
        );

        emit NewMessage(msg.sender, _text, block.timestamp);
    }

    /// @notice Get total number of messages stored
    function getMessagesCount() external view returns (uint256) {
        return messages.length;
    }

    /// @notice Get a single message by index
    function getMessage(uint256 index) external view returns (address, string memory, uint256) {
        require(index < messages.length, "Invalid index");
        Message memory m = messages[index];
        return (m.sender, m.text, m.timestamp);
    }

    /// @notice Get all messages
    function getAllMessages() external view returns (Message[] memory) {
        return messages;
    }
}

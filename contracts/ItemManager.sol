// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable
{

    enum SupplyChaninState
    {
        Created, 
        Paid, 
        Delivered
    }

    struct ItemModel
    {
        Item _item;
        string _itemID;
        uint _itemPrice;
        ItemManager.SupplyChaninState _itemState;
    }

    struct DetailedItemList
    {
      uint itemIndex;
      mapping (uint => ItemModel) itemList;
    }

    mapping (uint => ItemModel ) public items;
    mapping (address => DetailedItemList) public ownedItems;
    
    event SupplyChaninStep(uint _itemIndex, uint _itemState, address _itemAddress);
    event ItemDetails(string _itemID, uint _itemPrice, Item _item);
    uint public itemIndex;
    event ItemCount(uint _itemCount);


    function createItem(string memory _id, uint _itemPrice)
      public
      onlyOwner
    {
        Item item = new Item( this, _itemPrice, itemIndex);
        items[itemIndex]._item = item;
        items[itemIndex]._itemID = _id;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._itemState = SupplyChaninState.Created;

        emit SupplyChaninStep(itemIndex, uint(items[itemIndex]._itemState), address(item));

        itemIndex++;
    }

    function findItemByIndex(uint _itemIndex)
      public
    {
      emit ItemDetails(items[_itemIndex]._itemID, items[_itemIndex]._itemPrice, items[_itemIndex]._item);
    }

    function getItemCountOfAccount(address _address)
      public
    {
      require(_address == msg.sender, "You do not have permission");
      
      emit ItemCount(ownedItems[_address].itemIndex);
    }

    function findItemByIndexForAccount(address _address, uint _index)
      public
    {
      require(_address == msg.sender, "You do not have permission");

      emit ItemDetails(ownedItems[_address].itemList[_index]._itemID,ownedItems[_address].itemList[_index]._itemPrice,ownedItems[_address].itemList[_index]._item);
    }

    function triggerPayment(uint _itemIndex)
      public
      payable
    {
        require(items[_itemIndex]._itemPrice == msg.value , "Only full payments accepted!");
        require(items[_itemIndex]._itemState == SupplyChaninState.Created, "Item Not created or was allready paid!");

        items[_itemIndex]._itemState = SupplyChaninState.Paid;

        DetailedItemList storage newDetails = ownedItems[msg.sender];
        newDetails.itemList[newDetails.itemIndex] = items[_itemIndex];
        newDetails.itemIndex++;

        emit SupplyChaninStep(_itemIndex, uint(items[_itemIndex]._itemState), address(items[_itemIndex]._item));

    }


    function triggerDelivery(uint _itemIndex)
      public
      onlyOwner
    {
        require(items[_itemIndex]._itemState == SupplyChaninState.Paid, "Item was not paid!");

        items[_itemIndex]._itemState = SupplyChaninState.Delivered;

        emit SupplyChaninStep(_itemIndex, uint(items[_itemIndex]._itemState), address(items[_itemIndex]._item));
    }
}
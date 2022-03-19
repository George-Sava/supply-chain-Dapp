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

    mapping ( uint => ItemModel ) public items;

    event SupplyChaninStep(uint _itemIndex, uint _itemState, address _itemAddress);
    event ItemDetails(string _itemID, uint _itemPrice, Item _item);
    uint public itemIndex;


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
      onlyOwner
    {
      emit ItemDetails(items[_itemIndex]._itemID, items[_itemIndex]._itemPrice, items[_itemIndex]._item);
    }

    function triggerPayment(uint _itemIndex)
      public
      payable
    {
        require(items[_itemIndex]._itemPrice == msg.value , "Only full payments accepted!");
        require(items[_itemIndex]._itemState == SupplyChaninState.Created, "Item Not created or was allready paid!");

        items[_itemIndex]._itemState = SupplyChaninState.Paid;

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
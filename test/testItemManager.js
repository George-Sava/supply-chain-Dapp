const ItemManager = artifacts.require("./ItemManager.sol");

contract("ItemManager",async accounts => {
    it("should be able to add an Item",async () => {
        const itemManagerInstance = await ItemManager.deployed();
        const itemIdentifier = 'testItem1';
        const itemPrice = 500000;

        const result = await itemManagerInstance.createItem(itemIdentifier, itemPrice, { from: accounts[0]})
        assert.equal(result.logs[0].args._itemIndex, 0, "It's not the first item!");

        const item = await itemManagerInstance.items(0);
        assert.equal( item._itemID, itemIdentifier,"The item Identifier doesn't match!" )

    })
});
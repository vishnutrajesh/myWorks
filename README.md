# Deep nested row expansion table

This is a component to manage deeply nested table view for Dlt ledges trader platform contracts, purchase orders, and shipments

## Component Selector
```
<row-expansion-table></row-expansion-table>
```

## Options

| Options        | Default Value | Use  |
| -------------  |:-------------:| :-----|
| expansion      | false        | To make row expandable |
| showReDirect   | true         |   To show re-direct button to navigate to contract overview |

## Table Configuration (tbale three level hierarchy json config)

```
tableConfig = {
        tableData: this.contractList,
        parentTable: {
          th: [
            'CONTRACT ID',
            'TYPE',
            'CONTRACT NAME',
            'PRODUCT',
            'PARTNER',
            'TOTAL AMOUNT',
            'DATE',
            'STATUS'
          ],
          dataKey: [
            'contractId',
            'type',
            'contractName',
            'product',
            'partner',
            'totalAmount',
            'date',
            'status',
          ],
          childArrayKey: 'po',
        },
        firstChildTable: {
          th: [
            'PO ID',
            'PRODUCT',
            'QUANTITY',
            'AMOUNT',
            'DATE',
            'CREATED BY',
            'STATUS'
          ],
          dataKey: [
            'poDetails',
            'product',
            'quantity',
            'amount',
            'date',
            'createdBy',
            'status',
          ],
          childArrayKey: 'shipments',
        },
        secondChildTable: {
          th: [
            'SHIPMENT ID',
            'PRODUCT',
            'QUANTITY',
            'AMOUNT',
            'DATE',
            'CREATED BY',
            'STATUS'
          ],
          dataKey: [
            'shipmentDetails',
            'product',
            'quantity',
            'amount',
            'date',
            'createdBy',
            'status',
          ],
        }
      }
```

## Table View
![row](https://user-images.githubusercontent.com/84440673/144641503-aa26c04b-ce40-4008-b6d1-507dbda2af94.jpg)




# Deep nested row expansion table

This a component to manage deep nested table view for Dlt ledges trader platform contracts, purchase orders and shipments

## Component Selector

<row-expansion-table></row-expansion-table>

## Options

| Options        | Default Value | Use  |
| -------------  |:-------------:| :-----|
| expansion      | false        | to make row expandable |
| showReDirect   | true         |   To show ridirect button to navigate to contrcat overview |

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

![alt text](https://drive.google.com/file/d/1APb9xdXb-Ejh7NqjI-ypY7_eLFK7T7Dx/view?usp=sharing)



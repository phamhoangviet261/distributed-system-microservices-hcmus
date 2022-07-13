import React from 'react'
import Sidebar from './Sidebar'
import InvoiceTable from './InvoiceTable'
import styled from 'styled-components'



const Content = styled.div`
    padding: 30px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1200px;
    margin: 20px auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 50px;
`

function ManageInvoice() {
  return (
    <div>
        <Sidebar/>
        <Content>
            <InvoiceTable></InvoiceTable>
        </Content>
    </div>
  )
}

export default ManageInvoice
import React from 'react'
import styled from 'styled-components'
import InfoForm from './InfoForm'
import Sidebar from './Sidebar'

const Content = styled.div`
    padding: 30px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1200px;
    margin: 20px auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 50px;
`

function ManageInfo() {
  return (
      <div>
          <Sidebar />
          <Content>
                <InfoForm />
          </Content>
      </div>
  )
}

export default ManageInfo
import React from 'react'
import Transacao from './Transacao'

import {render, screen} from '@testing-library/react'

describe('Componente de transação do extrato', () => {

    const {container} = render(<Transacao data="17/06/2022" tipo="saque" valor="20.00"/>)

    it('O snapshot do componente deve permanecer sempre o mesmo', () => {
      expect(container.firstChild).toMatchSnapshot()  
    })
})
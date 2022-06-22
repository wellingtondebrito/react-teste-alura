import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App, {calcularNovoSaldo} from './App'

describe('Componente principal', ()=>{
    it('Quando eu abro o app do banco o nome é exibido', ()=>{
        render(<App/>)
        expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })

    it('Quando eu abro o app do banco o saldo é exibido', () => {
        render(<App/>)
        expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
})

describe('Quando realizo uma transação', () =>{
    it('que é um saque, o valor vai diminuir', () => {
        const valores = {
            transacao: 'saque',
            valor: 50
        }

        const novoSaldo = calcularNovoSaldo(valores, 150)

        expect(novoSaldo).toBe(100)
    })
    it('quando for depositado, o valor vai aumentar', () => {
        const valores = {
            transacao: 'deposito',
            valor: 50
        }

        const novoSaldo = calcularNovoSaldo(valores, 150)

        expect(novoSaldo).toBe(200)
    })
    it('é um saque e a transação deve ser realizada!', () => {

        const {getByText, getByTestId, getByLabelText} = render(<App/>)

        const saldo = getByText('R$ 1000')
        const transacao = getByLabelText('Saque')
        const valor = getByTestId('valor')
        const btnTransacao = getByText(/Realizar operação/i)

        expect(saldo.textContent).toBe('R$ 1000')
        
        fireEvent.click(transacao, {target: {value: 'saque'}})
        fireEvent.change(valor, {target: {value: '10'}})
        fireEvent.click(btnTransacao)

        expect(saldo.textContent).toBe('R$ 990')
    })
})
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      description,
      amount,
      type,
      category
    })

    setDescription('');
    setAmount(0);
    setType('');
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >

      <button
      type="button"
      onClick={onRequestClose}
      className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>
      
    <Container onSubmit={handleCreateNewTransaction}>
      <h2>Cadastrar transação</h2>

      <input
        placeholder="Descrição"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={event => setAmount(Number(event.target.value))}
      />

      <TransactionTypeContainer>
        <RadioBox
          type="button"
          className={type === 'deposit' ? 'active' : ''}
          onClick={() => { setType('deposit') }}
          isActive={type === 'deposit'}
          activeColor={'green'}
        >
          <img src={incomeImg} alt="Entrada"/>
          <span>Entrada</span>
        </RadioBox>

        <RadioBox
          type="button"
          className={type === 'withdraw' ? 'active' : ''}
          onClick={() => { setType('withdraw') }}
          isActive={type === 'withdraw'}
          activeColor={'red'}
        >
          <img src={outcomeImg} alt="Saída"/>
          <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>

      <input
        placeholder="Categoria"
        value={category}
        onChange={event => setCategory(event.target.value)}
      />

      <button type="submit">
        Cadastrar
      </button>

    </Container>
    </Modal>
    )
}